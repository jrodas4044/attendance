"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import ListCourses from '../components/ListCourses';
import TeacherListCourse from '../components/TeacherListCourse';
import * as Auth from 'aws-amplify/auth';



Amplify.configure(outputs);

const client = generateClient<Schema>();

async function getCurrentUserGroup() {
  try {
      const session = await Auth.fetchAuthSession();
      const userGroups = session.tokens?.accessToken.payload['cognito:groups'];
      return  userGroups;
  } catch (error) {
      console.error('Error fetching user groups:', error);
      return null;
  }
}

export default function App() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [student, setStudent] = useState<any>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data: student } = await client.models.Student.get({
          // @ts-ignore
          email: user.signInDetails.loginId
        }, {
          selectionSet: ['name', 'email', 'courses.course.*']
        });

        console.log('student: ',student, user.signInDetails.loginId);

        setStudent(student);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
      }
    };

    if (user) {
      getCurrentUserGroup().then(groups => {
        // @ts-ignore
        const hasTeacherGroup = groups.find((group: string) => group === 'TEACHERS');
        if (hasTeacherGroup) {
          setIsTeacher(true);
        }
      });

      if (isTeacher) {
        console.log('isTeacher: ', isTeacher);
        setLoading(false);
        return;
      }
      fetchStudent();   
      setLoading(false);
     
    }
  }, [user]);

  return (
    <main>
      <div className='flex space-x-4 items-center justify-center'>
        <div className='w-24 h-24 bg-white rounded-full shadow border-4 overflow-hidden'>
          <img src={`https://d1aet42jaoyd8g.cloudfront.net/LCPJI/${user?.userId}.jpg`} alt="Usuarios"/>
        </div>
        <h2 className='text-sm'>
          <strong>Usuario: </strong>
          {user?.signInDetails.loginId}
        </h2>
      </div>
      <div className='my-6'>
        { 
          isTeacher ? <TeacherListCourse user={user} /> : 
          <ListCourses    student={student} />
        }
      </div>
    </main>
  );
}
