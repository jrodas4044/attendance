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

  return (
    <div>
      <h1>Cursos</h1>
      {loading ? (
        <p>Cargado...</p>
      ) : (
        courses.map((course) => (
          <div key={course.id}
            className='flex items-center justify-between text-xs border bg-white shadow rounded-2xl border-gray-200 p-4 my-4'
          >
            <div>
              <h3 className='font-bold'>{course.name}</h3>
            </div>
            <div>
              <p>{course.scheduleStart}</p>
              <p>{course.scheduleEnd}</p>
            </div>

            <div>
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