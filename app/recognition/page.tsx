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
import {uuid} from "uuidv4"; // Asegúrate de que la ruta de importación sea correcta


Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: outputs.custom.API,
  },
});

async function handleAnalysisComplete() {
  console.log('Analysis complete');
}


 export default function Recognition() {
   const { session, loading, error } = useSession();
  return (
    <ThemeProvider
    >

      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Face Recognition</h1>
          <FaceLivenessDetector
            sessionId={session?.SessionId ? session.SessionId : uuid()}
            region="us-east-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={(error) => {
              console.error(error);
            }}
          />
        </>)}
    </ThemeProvider>
  );
}