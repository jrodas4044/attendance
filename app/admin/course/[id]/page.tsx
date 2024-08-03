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
import { get } from 'aws-amplify/api';
import Image from 'next/image'

Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: outputs.custom.API,
  },
});

const client = generateClient<Schema>();


type Course = {
  id: String,
  name: String,
  attendanceControls: any[],
}

type Student = {
  id: String,
  name: String,
  email: String | null,
  cognitoId: String | null,
  poolId: String | null
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
        }, {
          // @ts-ignore
          selectionSet: ["id", "name", "scheduleStart", "scheduleEnd", "students.student.*", "attendanceControls.*"]
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

     const students = course?.students?.filter((student: any) => {
        return student.student !== null;
      });


      const studentPromises = students.map(async (student: any) => {
        try{
        const restOperation = await get({
          apiName: "myHttpApi",
          path: `/user/${student.student.email}`
        });
          

         const { body } = await restOperation.response;

        const json = await body.json();
         const stduent = {
            ...student.student,
            // @ts-ignore
           poolId: json?.UserAttributes?.find((attr: any) => attr.Name === 'sub')?.Value
          }
          return stduent;
        }catch (error) {
          console.info("Error fetching student:", student.student);
          return {
            ...student.student,
            poolId: null
          };
        }
      });

      const studentsResolve = await Promise.all(studentPromises);
      // eliminar los estudiantes que no se pudieron resolver
      const studentsFiltered = studentsResolve.filter((student: any) => student.poolId !== null);
      setStudents(studentsFiltered)
      setLoading(false);
    }

    if(course !== null) {
      fetchStudents()
    }
  }, [course]);



  const getUserImage =  async(email: string) => {
    const restOperation = await get({
      apiName: "myHttpApi",
      // @ts-ignore
      path: `/user/${student?.email}`
    });

    const { body } = await restOperation.response;

    const json = await body.json();
  }

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
                <th>#</th>
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
                    <td className='border border-gray-400 text-sm px-4 py-2 text-center'>
                      {index + 1}
                    </td>
                    <td className='flex flex-items-center justify-center border border-gray-400 text-sm px-4 py-2'>
                      <div className='w-12 h-12 bg-white rounded-full shadow border-4 overflow-hidden'>
                        <Image 
                          src={`https://d1aet42jaoyd8g.cloudfront.net/LCPJI/${student?.poolId}.jpg`}
                          alt="Usuarios"
                          width={200}
                          height={200}
                          quality={80}	
                          />
                      </div>
                    </td>
                    <td className='border border-gray-400 text-sm px-4 py-2'>
                      <div className='font-bold'>
                        {student?.name}
                      </div>
                      <div>
                        {student?.poolId}
                      </div>
                    </td>
                    <td className='border border-gray-400 text-sm px-4 py-2'>{student?.email}</td>
                  </tr>
                )))
            }
            </tbody>
          </table>

          <table className='table w-full my-4 bg-white rounded shadow overflow-hidden'>
            <thead className='bg-gray-400'>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Disponible</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {course?.attendanceControls?.map((attendanceControl: any, index: number) => (
                <tr key={index} >
                  <td className='border border-gray-400 text-sm px-4 py-2'>{attendanceControl.date}</td>
                  <td className='border border-gray-400 text-sm px-4 py-2'>{attendanceControl.time}</td>
                  <td
                    className='border border-gray-400 text-sm px-4 py-2'>{attendanceControl.available ? 'Si' : 'No'}</td>
                  <td
                    className='border border-gray-400 text-sm px-4 py-4 text-center'
                  >
                    <a
                      className={`bg-blue-500 text-white px-4 py-2 rounded`}
                      href={`/admin/attendanceControl/${attendanceControl?.id}`}
                    >
                      Ver
                    </a>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      }
    </>
  )
};

export default AdminCoursePage