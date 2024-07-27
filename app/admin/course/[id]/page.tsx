"use client";

import React, { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useParams } from 'next/navigation';
import {CourseCreateForm, CourseUpdateForm} from "@/ui-components";
// Buscar usuarios de cognito a través de la API de Amplify
import { } from 'aws-amplify/auth';
Amplify.configure(outputs);
const client = generateClient<Schema>();


type Course = {
  name: String,
}

type Student = {
  id: String,
  name: String,
  email: String | null
  cognitoId: String | null
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
      const { data , error } = await course.students();
      if (error) {
        console.error("Error fetching students:", error);
      }

      const studentPromises = data.map( async (student: any) => {
        const { data: studentData } =  await student.student();
        return studentData
      });

      const resolvedStudents = await Promise.all(studentPromises);
      setStudents(resolvedStudents)
      setLoading(false);
    }

    if(course !== null) {
      fetchStudents()
    }
  }, [course]);

  // @ts-ignore
  return (
    <>
      {loading ? (
        <p>Cargado...</p>
      ) : (
        <div>
          <div className='bg-white shadow border rounded'>
            <CourseUpdateForm course={course} />
          </div>
          <table className='table w-full my-4 bg-white rounded shadow overflow-hidden'>
            <thead className='bg-gray-400'>
              <tr>
                <th>
                  Fotografía
                </th>
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
                students.map((student:Student, index: number) => (
                  <tr key={index}>
                    <td className='flex flex-items-center justify-center border border-gray-400 text-sm px-4 py-2'>
                      <div className='w-12 h-12 bg-white rounded-full shadow border-4 overflow-hidden'>
                        <img src={`https://d1aet42jaoyd8g.cloudfront.net/LCPJI/${student?.cognitoId}.jpg`} alt="Usuarios"/>
                      </div>
                    </td>
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