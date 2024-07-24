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
  // cargar estudiante asociado con el cognito user
  const [student, setStudent] =  useState<any>(null);

  // Obtener el usuario actual
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);

        // Obtener el estudiante asociado con el usuario actual
        const { data: students } = await client.models.Student.list();
        const student = students.find((student) => student.cognitoId === user.userId);
        setStudent(student);
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
          const { data: course } = await client.models.Course.get({
            id : id
          });
          setCourse(course);

          if (course) {
            const { data: attendances } = await course.attendanceControls();
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
                    return item.studentId === student?.id;
                }
              );

              if (studentAttendance) {
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

    fetchCourse();
  }, [user,student,id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {course ? (
        <div>
          <h1 className='text-xl font-bold mb-4 text-center'>{course.name}</h1>
          <div>
            <h2 className='text-lg font-bold'>Asistencias</h2>
            {attendances.length > 0 ? (
              attendances.map((attendance) => (
                <div
                  className='flex items-center justify-between bg-white shadow rounded-2xl border p-4 my-4'
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
                      <span className='text-green-500'>Sí</span>
                    ) : (
                      <span className='text-red-500'>No</span>
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