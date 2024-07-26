"use client";

import React from 'react';

import "./app.css";
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
import Link from 'next/link'

I18n.putVocabularies(translations);
I18n.setLanguage('es');


Amplify.configure(outputs);


import { signOut } from 'aws-amplify/auth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  async function handleSignOut() {
    await signOut()
  }

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>Control de asistencia</title>

      </head>
      <body>
      <Authenticator hideSignUp>
        <div className='block'>
        <header className='flex items-center  justify-between px-6   bg-red-800 w-screen'>
          <div>
          <Link href='/'>
            <img 
            src='https://www.udeo.edu.gt/wp-content/uploads/2021/10/logo_wn.png' 
            alt='logo' 
            className='w-24 p-4'
            />
          </Link>
          </div>
          <h1 className='text-xl font-bold text-white  p-4'>Control de asistencia</h1>

          <div>
            <button
              className='bg-red-900 text-white p-2 rounded-lg'
              onClick={handleSignOut}
            >
              Cerrar sesión
            </button>
          </div>
        </header>
          <main className='container mx-auto my-6 text-gray-700'>
            {children}
          </main>

          <footer className='container mx-auto my-6 text-gray-700'>
          </footer>
        </div>
      </Authenticator>
      </body>
    </html>
  );
}

function obtenerUbicacion(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
  } else {
    (document.getElementById("ubicacion") as HTMLElement).innerHTML = "La geolocalización no es soportada por este navegador.";
  }
}

function mostrarPosicion(posicion: GeolocationPosition): void {
  const lat: number = posicion.coords.latitude;
  const lon: number = posicion.coords.longitude;
  (document.getElementById("ubicacion") as HTMLElement).innerHTML = `Latitud: ${lat}<br>Longitud: ${lon}`;
}

function mostrarError(error: GeolocationPositionError): void {
  let mensaje: string;
  switch(error.code) {
    case error.PERMISSION_DENIED:
      mensaje = "El usuario denegó la solicitud de geolocalización.";
      break;
    case error.POSITION_UNAVAILABLE:
      mensaje = "La información de la ubicación no está disponible.";
      break;
    case error.TIMEOUT:
      mensaje = "La solicitud de ubicación ha caducado.";
      break;
    case error.UNKNOWN_ERROR:
      mensaje = "Ha ocurrido un error desconocido.";
      break;
    default:
      mensaje = "Ha ocurrido un error.";
      break;
  }
  (document.getElementById("ubicacion") as HTMLElement).innerHTML = mensaje;
}
