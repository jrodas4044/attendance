"use client";

import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useParams } from 'next/navigation';
import {div} from "@tensorflow/tfjs-core";

Amplify.configure(outputs);
const client = generateClient<Schema>();


type Course = {
  name: String,
}

type Student = {
  name: String,
  email: String | null
}

const AdminCoursePage = () => {
  const [course, setCourse] = useState<Course | null >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<Student[] | [] >([]);
  const params = useParams();
  const courseId = params.id || null;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // @ts-ignore
        const { data: course } = await client.models.Course.get({
          // @ts-ignore
          id: courseId
        });
        // @ts-ignore
        setCourse(course);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchStudents = async () => {
      // @ts-ignore
      const { data: students } = await course.students();
      setLoading(false);
      setStudents(students)
    }

    if(course !== null) {
      fetchStudents()
    }
  }, [course]);

  return (
    <>
      {loading ? (
        <p>Cargado...</p>
      ) : (
        <div>
          <h2>{course?.name}</h2>
          <table className='table w-full my-4'>
            <thead className='bg-gray-400'>
              <tr>
                <th>
                  Nombre
                </th>
                <th>
                  Correo
                </th>
              </tr>
            </thead>
            <tbody>
            {
              students.length <= 0? (
               <tr>
                 <td colSpan={2}>
                   Sin alumnos asigandos
                 </td>
               </tr>
              ) : (
                students.map((student) => (
                  <tr>
                    <td className='border border-gray-400 text-sm px-4 py-2'>{student.name}</td>
                    <td className='border border-gray-400 text-sm px-4 py-2'>{student.email}</td>
                  </tr>
                )))
            }
            </tbody>
          </table>
        </div>
      )
      }
    </>
  )
};

export default  AdminCoursePage