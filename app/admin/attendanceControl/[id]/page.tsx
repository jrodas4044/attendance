"use client";

import React, { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useParams } from 'next/navigation';
// Buscar usuarios de cognito a través de la API de Amplify
import { get } from 'aws-amplify/api';
import { isEmail } from '@/utils/validator';
import moment from 'moment-timezone';
import Spinner from "@cloudscape-design/components/spinner";

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
  name: string
}

type AttendanceControl = {
  name: string,
  date: string,
  course: Course,
  studentAttendances: []
}

const AttendaceControlPage = () => {
  const params = useParams();
  const id = params.id;
  const [attendanceControl, setAttendanceControl] = useState<AttendanceControl | null >(null)
  const [studentWithOutAttendance, setStudentWithOutAttendance] = useState<[] | null > ([])

  const [loading, setLoading] = useState<boolean>(true);
  const [totalAttended, setTotalAttended] = useState(0)
  const [totalNoAttended, setTotalNoAttended] = useState(0)
  const [totalStudent, setTotalStudent] = useState(0)
  const [reload, setReload] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {

    const fetchAttendanceControl = async () => {
      const {data:attendanceControl} = await client.models.AttendanceControl.get({
        // @ts-ignore
        id: id
      },{
        selectionSet: ['date', 'course.*', 'studentAttendances.student.*', 'studentAttendances.date']
      })
      // @ts-ignore
      setAttendanceControl(attendanceControl)
      console.log(attendanceControl)
    }

    fetchAttendanceControl()

  }, [id, reload]);

  useEffect(() => {
    const fetchStudents = async () => {
      setShowSpinner(true)
      const { data: course } = await client.models.Course.get({
        // @ts-ignore
        id: attendanceControl?.course?.id
      }, {
        // @ts-ignore
        selectionSet: ["students.student.*"]
      });

      if (course) {
      
        // @ts-ignore
        course.students = course.students.filter((student: any, index: number, self: any[]) => {
          return student.student !== null && student.student.email !== null , isEmail(student.student.email)    && self.findIndex((s) => s.student.email === student.student.email) === index;
        });

        // @ts-ignore
        attendanceControl.studentAttendances = attendanceControl?.studentAttendances.filter((student: any, index: number, self: any[]) => {
          return student.student !== null && student.student.email !== null && self.findIndex((s) => s.student.email === student.student.email) === index;
        }).sort((a: any, b: any) => {
          return a.student.name.localeCompare(b.student.name);
        });
        // @ts-ignore
        const attendedStudentsEmails = attendanceControl?.studentAttendances.map((attendance: any) => attendance.student.email);

        // @ts-ignore
        const studentsWithoutAttendanceFilter = course.students
          .filter((student: any) => {
            // @ts-ignore
            return !attendedStudentsEmails.includes(student.student.email);
          })
          .sort((a: any, b: any) => {
            return a.student.name.localeCompare(b.student.name);
          });
       
        // @ts-ignore
        setTotalAttended(attendedStudentsEmails.length)
        // @ts-ignore
        setTotalStudent(course.students.length)
        setTotalNoAttended(studentsWithoutAttendanceFilter.length)
        // @ts-ignore
        setStudentWithOutAttendance(studentsWithoutAttendanceFilter);
        setLoading(true)
        setShowSpinner(false)
      }
    }

    if (attendanceControl !== null) {
      fetchStudents()
    }

  }, [attendanceControl]);

  // @ts-ignore
  const convertDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    });

  }


  const saveAttendance = async (email: string) => {
    setShowSpinner(true)
    const { data } = await client.models.StudentAttendance.create({
      studentId: email,
      // @ts-ignore
      attendanceControlId: id,
      // @ts-ignore
      date: new Date().toISOString(),
      isPresent: true,
  });

  setShowSpinner(true)


    if (data) {
      setReload(!reload)
    }
  }

  return (
    <div>
      {!loading ? (
        <div>Cargado ....</div>
      ) : (
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex justify-center items-center space-x-4'>
              <div>
                <a href={`/admin`}>
                  <h2 className='text-xl font-bold'>{attendanceControl?.course.name}</h2>
                </a>

                <div>
                {attendanceControl?.date}
              </div>

              </div>
              
              <div>
              <div>
                 { showSpinner && <Spinner />}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center space-x-4 text-xs font-bold'>
              <div className='flex items-center space-x-2 bg-green-400 px-4 py-2 rounded-2xl'>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fill-rule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"/>
                  </svg>
                </i>
                <span>
                  Asistieron: {totalAttended}
                </span>
              </div>
              <div className='flex items-center space-x-2 bg-red-400 px-4 py-2 rounded-2xl'>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clip-rule="evenodd"/>
                  </svg>
                </i>
                <span>
                  Faltaron: { totalNoAttended }
                </span>
              </div>
              <div className='flex items-center space-x-2 bg-blue-400 px-4 py-2 rounded-2xl'>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path
                      d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
                  </svg>

                </i>
                <span>
                  Alumnos: {totalStudent}
                </span>
              </div>
            </div>
          </div>



        
          {
            // @ts-ignore
            studentWithOutAttendance.map((item:any, index) => (
              <div key={index} className='grid grid-cols-4 p-4 bg-red-100 border my-4 shadow rounded-2xl text-xs'>
                <div className='flex items-center font-bold'>
                  {item.student.name}
                </div>
                <div className="flex items-center col-span-2">
                  {item.student.email}
                </div>

                <div className='flex justify-end'>
                   <button className='bg-green-500 text-white px-4 py-2 rounded'
                      onClick={() => saveAttendance(item.student.email)}
                   >
                      Asistió
                    </button>
                </div>
              </div>
            ))
          }


          {attendanceControl?.studentAttendances.map((item:any, index) => (
            <div key={index} className='grid grid-cols-4 p-4 bg-white border my-4 shadow rounded-2xl text-xs'>
              <div className='font-bold'>
                {item.student.name}
              </div>
              <div>
                {item.student.email}
              </div>
            </div>
          ))
          }
        </div>
      )}
    </div>
  );
}
export default AttendaceControlPage;