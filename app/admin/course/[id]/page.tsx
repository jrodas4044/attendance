'use client';
import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useParams } from 'next/navigation';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function App() {

  const [course, setCourse] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const courseId = params.id || null;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data: course } = await client.models.Course.get({
          id: courseId
        });
        setCourse(course);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);


  console.log(params);

  return (
    <>
      {loading ? (
        <p>Cargado...</p>
      ) : (
        <div>
          <h2>{course?.name}</h2>
        </div>
        )
      }
    </>
  )
}