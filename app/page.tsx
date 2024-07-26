"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { getCurrentUser } from 'aws-amplify/auth';
import ListCourses from '../components/ListCourses';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data: student } = await client.models.Student.get({
          id: user?.userId
        });
        setStudent(student);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudent();
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
      <div>
        <ListCourses  user={user} />
      </div>
    </main>
  );
}
