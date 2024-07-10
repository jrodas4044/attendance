import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import {auth} from "../auth/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),



   Course: a
    .model({
      name: a.string().required(),
      days: a.enum(["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]),
      scheduleStart: a.time(),
      scheduleEnd: a.time(),
      attendanceControls: a.hasMany('AttendanceControl', 'courseId' ),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    AttendanceControl: a
      .model({
        courseId: a.id(),
        course: a.belongsTo('Course',  'courseId' ),
        date: a.date(),
        time: a.time(),
        available: a.boolean().default(true),
      }).authorization((allow) => [allow.publicApiKey()]),

    Student: a.model({
      cognitoId: a.string(),
      name: a.string().required(),
      carne: a.string(),
      email: a.string(),
      pictureName: a.string(),
      courses: a.hasMany('Course', 'studentId' ),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Attendance: a.model({
      studentId: a.id(),
      student: a.belongsTo('Student', 'studentId'),
      attendanceControlId: a.id(),
      attendanceControl: a.belongsTo('AttendanceControl', 'attendanceControlId'),
      date: a.datetime(),
      isPresent: a.boolean().default(false),
    }).authorization((allow) => [allow.publicApiKey()]),

  justificationForLackOfAttendance: a
    .model({
      studentId: a.id(),
      student: a.belongsTo('Student', 'studentId'),
      attendanceControlId: a.id(),
      attendanceControl: a.belongsTo('AttendanceControl', 'attendanceControlId'),
      date: a.date(),
      justification: a.string(),
      file: a.string(),
    }).authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});


/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
