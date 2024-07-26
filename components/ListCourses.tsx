// List course component
import {useState, useEffect} from "react";
import {generateClient} from "aws-amplify/data";
import type {Schema} from "@/amplify/data/resource";
import "./../app/app.css";
import {Amplify} from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

interface ListCoursesProps {
  user?: any
}

export default function ListCourses({user}: ListCoursesProps) {
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        //setCourses(courses);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main>
      <div>
        <h2 className='text-xl font-bold'>Cursos:</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          courses.map((course: any) => (
            <div
              key={course.id}
              className='flex items-center justify-between text-xs   border bg-white shadow rounded-2xl border-gray-200 p-4 my-4'
            >
              <div>
                <h2 className='text-lg'>{course.name}</h2>
              </div>
              <div className='text-center'>
                <strong>Horario</strong>
                <p>{course.scheduleStart}</p>
                <p>{course.scheduleEnd}</p>
              </div>

              <div>
                <a
                  href={`/course/${course.id}`}
                  className='bg-blue-500 text-white p-2 rounded-2xl'
                >
                  Ver
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}