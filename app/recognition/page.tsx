"use client";
import React from 'react';
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import { Loader, ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import useSession from './useSession';
import {uuid} from "uuidv4";
import {get} from "aws-amplify/api"; // Asegúrate de que la ruta de importación sea correcta
import {fetchUserAttributes} from 'aws-amplify/auth';


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


   // state to store the user attributes
    const [userAttributes, setUserAttributes] = useState<UserAttributes | null>(null);
    useEffect(() => {
      // fetch the user attributes when the component mounts
      fetchUserAttributes().then((attributes ) => {
        // @ts-ignore
        setUserAttributes(attributes);
        console.log(attributes);
      });
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


            {userAttributes?.picture ? (
              <img
                src={userAttributes.picture}
                alt="User"
                width="100"
                height="100"
                className={"rounded-full border-4 border-white w-24 h-24 overflow-hidden"}
              />
            ) : null}

            <div>
              <div className={"ml-4"}>
                <strong>Nombre:</strong> Jonhathan Rolando Rodas
              </div>
              <div className={"ml-4"}>
                <strong>Curso:</strong> Casuistica Policial
              </div>
              <div className={"ml-4"}>
                <strong>Nombre:</strong> Jonhathan Rolando Rodas
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