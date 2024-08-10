import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import { getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure(outputs);

// @ts-ignore
const client = generateClient<Schema>();

const getCurrentUserGroup = async () => {
  try {
      const currentUser = await getCurrentUser();
      return currentUser; 
  } catch (error) {
      console.error('Error fetching user groups:', error);
      return null;
  }
};

const getTeacher = async (email:string) => {
  try {
    // @ts-ignore
    const { data: teacher } = await client.models.Teacher.get({
      // @ts-ignore
      email: email
    }, {
      selectionSet: ['name', 'email', 'courses.*']
    });

    return teacher;
  } catch (error) {
    console.error("Error fetching teacher:", error);
  }
};

function App() {
  const [user, setUser] = useState<any>(null);
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUserGroup().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getTeacher(user.signInDetails.loginId).then((teacher) => {
        setTeacher(teacher);
      });

      setLoading(false);
    }
  }, [user]);


  return (
    <>
      <h2 className='text-xl font-bold'>Cursos:</h2>

      <div>
        {loading ? <p>Cargando...</p> : (
          teacher?.courses.length === 0 ? <p>Sin cursos asignados</p> : teacher?.courses.map((course: any) => (
            <div
              key={course.id}
              className='flex items-center justify-between text-xs   border bg-white shadow rounded-2xl border-gray-200 p-4 my-4'
            >
              <div>
                <h2 className='text-lg'>{course.name}</h2>
              </div>
              <div className='text-center'>
                <strong>Horario</strong>
                <p>{course.days}</p>
                <p>{course.scheduleStart}</p>
                <p>{course.scheduleEnd}</p>
              </div>

              <div>
                <a
                  href={`/admin/course/${course.id}`}
                  className='bg-blue-500 text-white p-2 rounded-2xl'
                >
                  Ver
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

  

export default App;
  
