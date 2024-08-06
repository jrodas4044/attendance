"use client";

import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);
const client = generateClient<Schema>();

const AdminPage = () => {

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: courses } = await client.models.Course.list();
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const searchCourse = async (query:string) => {
    try {
      setLoading(true);
      const { data: courses } = await client.models.Course.list({ filter: { name: { contains: query } } });
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='text-2xl mb mb-4'>Cursos</h1>
      <div>
        <input
          type='text'
          placeholder='Buscar curso'
          onChange={(e) => searchCourse(e.target.value)}
          className='w-full border border-gray-200 rounded-2xl p-2'
        />
      </div>
      {loading ? (
        <p>Cargado...</p>
      ) : (
        courses.map((course) => (
          <div key={course.id}
            className='grid grid-cols-3 text-xs border bg-white shadow rounded-2xl border-gray-200 p-4 my-4'
          >
            <div className='flex items-center justify-start'>
              <h3 className='font-bold'>{course.name}</h3>
            </div>
            <div>
              <p>{course.days}</p>
              <p>{course.scheduleStart}</p>
              <p>{course.scheduleEnd}</p>
            </div>

            <div className="flex items-center justify-end">
              <a href={`/admin/course/${course.id}`} className='bg-blue-500 text-white p-2 rounded-2xl'>
                Ver
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;