"use client";
import React from 'react';
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../../app.css";
import { Loader, ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import useSession from './useSession';
import {uuid} from "uuidv4";
import {get, post} from "aws-amplify/api"; // Asegúrate de que la ruta de importación sea correcta
import {fetchUserAttributes, getCurrentUser} from 'aws-amplify/auth';


Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: outputs.custom.API,
  },
});

const client = generateClient<Schema>()

interface UserAttributes {
  picture?: string;
}

 export default function Recognition() {
   const { session, loading, error } = useSession();

   const [user, setUser] = useState<any>(null);
   const [student, setStudent] = useState<any>(null);


   useEffect(() => {
     const fetchUser = async () => {
       try {
         const user = await getCurrentUser();
         setUser(user);

         // Obtener el estudiante asociado con el usuario actual
         const { data: students } = await client.models.Student.list();
         const student = students.find((student) => student.cognitoId === user.userId);
         // @ts-ignore
         setStudent(student);
       } catch (error) {
         console.error("Error fetching user:", error);
       }
     };

     fetchUser();
   }, []);



   const handleAnalysisComplete = async () => {
    const { SessionId } = session!;

    console.log(`Analysis complete for session ${SessionId}`);
    // call getFaceLiveness API
     const restOperation = get({
       apiName: "myHttpApi",
       path: `session/${ SessionId }/liveness`,
     });
     const { body } = await restOperation.response;
     const json = await body.json();
      console.log(json);

     // @ts-ignore
     const { sessionId, response } = json;
      const referenceImage = response.ReferenceImage.S3Object.Name;

      console.log(referenceImage);

      // call compareFaces API
      // llamar al api rest para comparar las caras

     // @ts-ignore
     const restFaceCompare = post({
        apiName: "myHttpApi",
        path: `session/compare`,
        options: {
          body: {
            referenceImage,
            targetImage:  student?.name,
          }
        }
     });

     const jsonFaceCompare = await restFaceCompare.response;
     console.log(jsonFaceCompare)

   }

   // @ts-ignore
   // @ts-ignore
   return (
    <ThemeProvider
    >

      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className={"text-3xl font-bold  text-gray-800 text-center"}>Marcar Asistencia</h1>

          <div className={"flex items-center justify-center my-6"}>
            <div>
              <div className={"ml-4"}>
                <strong>Usuario:</strong> { student?.name }
              </div>
              <div className={"ml-4"}>
                <strong>Fecha:</strong> { new Date().toLocaleDateString() }
              </div>
            </div>
          </div>



          <div className={"container"}>
            <FaceLivenessDetector
              sessionId={session?.SessionId ? session.SessionId : uuid()}
              region="us-east-1"
              onAnalysisComplete={handleAnalysisComplete}
              onError={(error) => {
                console.error(error);
              }}
            />
          </div>
        </>)}
    </ThemeProvider>
  );
}