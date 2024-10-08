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
import { isEmail } from '@/utils/validator';
import Tabs from "@cloudscape-design/components/tabs";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import moment from 'moment-timezone';
import { AttendanceControlCreateForm } from "@/ui-components";
import CreateAttendace from '@/components/CreateAttendace';

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

        course?.attendanceControls?.map((attendanceControl: any) => {
          attendanceControl.date = moment(attendanceControl.date).format('DD-MM-YYYY');
          attendanceControl.start = moment(attendanceControl.start).format('DD-MM-YYYY HH:mm');
          attendanceControl.end = moment(attendanceControl.end).format('DD-MM-YYY HH:mm');
          return attendanceControl;
        });

        // Ordenar las asistencias por fecha desde la más reciente a la más antigua
       const sortedAttendanceControls = course?.attendanceControls?.sort((a: any, b: any) => {
          return moment(b.date).diff(moment(a.date));
        });

        // @ts-ignore
        setCourse({
          ...course,
          // @ts-ignore
          attendanceControls: sortedAttendanceControls
        });

      
        
          
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

    const students = course?.students?.filter((student: any, index: number, self: any[]) => {
       return student.student !== null && isEmail(student.student.email) && self.findIndex((s) => s.student.email === student.student.email) === index;
     });

     console.log(students);

      const studentPromises = students.map(async (student: any) => {

        const {data, errors} = await client.queries.getCognitoUserByEmail({
          email: student.student.email
        });

        if(errors) {
          return {
            ...student.student,
            poolId: null
          }
        }

        return {
          ...student.student,
          // @ts-ignore
         poolId: data
        };
      });

      const studentsResolve = await Promise.all(studentPromises);
      // eliminar los estudiantes que no se pudieron resolver
      // @ts-ignore
      setStudents(studentsResolve)
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

          <div className='mb-4'>
          <Header
      variant="h1"
  
    >
      Curso: {course?.name}
    </Header>
          </div>
 <Tabs
      tabs={[
        {
          label: "Asistencias",
          id: "first",
          content: (
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
                  <td className='border border-gray-400 text-sm px-4 py-2'>
                    De las {attendanceControl.start} a las {attendanceControl.end}
                    </td>
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
          )
        },
        {
          label: "Nueva asistencia",
          id: "fourth",
          content: (
            <CreateAttendace courseId={courseId} />
          )
        },
        {
          label: "Alumnos",
          id: "second",
          content: (
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
          )
        },
        {
          label: "Información",
          id: "third",
          content: (
            <div className='bg-white shadow border rounded'>
              <CourseUpdateForm course={course} />
            </div>
          )
        }
      ]}
      variant="container"
    />
        </div>
      )
      }
    </>
  )
};

export default AdminCoursePage