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

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);


  return (
    <main>
      <div className='flex items-center justify-center'>
        <h2 className='text-xl'>Usuario: {user?.signInDetails.loginId }</h2>
      </div>
      <div>
        <ListCourses />
      </div>

    </main>
  );
}
