'use client';
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser } from 'aws-amplify/auth';
import Link from 'next/link';

Amplify.configure(outputs);

const client = generateClient<Schema>();

const CourseDetail = () => {
  const params = useParams();
  const id = params.id || null;
  const [user, setUser] = useState<any>(null);
  const [marked, setMarked] = useState(false); // El usuario actual marcó la asistencia
  const [course, setCourse] = useState<any>(null);
  const [attendances, setAttendances] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  // Obtener el usuario actual
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

      fetchUser();

    }, []);

  // Obtener el curso y las asistencias
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (id) {

          // @ts-ignore
          const { data: course } = await client.models.Course.get({id});
          setCourse(course);

          if (course) {
            const { data: attendances } = await course.attendanceControls();
            // order by date
            attendances.sort((a: any, b: any) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            setAttendances(attendances);

            // Obtener asistencias de estudiantes de manera asíncrona
            const attendancesWithStudentAttendances = await Promise.all(
              attendances.map(async (attendance) => {
                const { data: studentAttendances } = await attendance.studentAttendances();
                return { ...attendance, studentAttendances };
              })
            );

            const studentAttendances =  attendancesWithStudentAttendances.map((attendance) => {
              return attendance.studentAttendances;
            });


            // filtrar asistencias del estudiante actual
            studentAttendances.forEach((attendance) => {
              const studentAttendance = attendance.find(
                (item) => {
                    return item.studentId === user.signInDetails.loginId;
                }
              );

              if (studentAttendance) {
                // @ts-ignore
                setMarked(studentAttendance.isPresent);
              }
            });

          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user !== null) {
      fetchCourse();
    }
  }, [user,id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {course ? (
        <div>
          <h1 className='text-xl font-bold mb-4 text-center'>{course.name}</h1>
          <div>
            <h2 className='text-lg font-bold'>Asistencias</h2>
            {attendances.length > 0 ? (
              attendances.map((attendance: any) => (
                <div
                  className='flex items-center justify-between bg-white shadow rounded-2xl border p-4 my-4 text-xs'
                  key={attendance.id}
                >
                  <div>
                    <p>
                      <strong>Fecha:</strong> {new Date(attendance.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Disponible:</strong>
                      {attendance.available ? (
                        <span className='text-green-500'>Sí</span>
                      ) : (
                        <span className='text-red-500'>No</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <strong className={'mr-2'}>Marcado:</strong>
                    {marked ? (
                      <span className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" className="size-6">
                          <path
                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/>
                        </svg>

                      </span>
                    ) : (
                      <span className='text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" className="size-6">
                          <path
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>

                      </span>
                    )}

                  </div>

                  <div className={'flex items-center justify-center '}>
                    {attendance.available && !marked ? (
                      <Link href={`/attendance/${attendance.id}`}
                            className={'cursor-pointer bg-blue-400 shadow rounded-full p-2 hover:bg-blue-600'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" className="size-6 text-white">
                          <path
                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/>
                        </svg>
                      </Link>
                    ) : (
                      <p className='text-red-500'>x</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Sin Asistencias</p>
            )}
          </div>
        </div>
      ) : (
        <p>Curso no encontrado</p>
      )}
    </div>
  );
};

export default CourseDetail;