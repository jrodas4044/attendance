/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttendanceControl = /* GraphQL */ `
  query GetAttendanceControl($id: ID!) {
    getAttendanceControl(id: $id) {
      available
      course {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
        teacherEmail
        updatedAt
        __typename
      }
      courseId
      createdAt
      date
      id
      studentAttendances {
        nextToken
        __typename
      }
      time
      updatedAt
      __typename
    }
  }
`;
export const getCareer = /* GraphQL */ `
  query GetCareer($id: ID!) {
    getCareer(id: $id) {
      courses {
        nextToken
        __typename
      }
      createdAt
      id
      name
      updatedAt
      __typename
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      attendanceControls {
        nextToken
        __typename
      }
      career {
        createdAt
        id
        name
        updatedAt
        __typename
      }
      careerId
      createdAt
      days
      id
      name
      scheduleEnd
      scheduleStart
      students {
        nextToken
        __typename
      }
      teacher {
        cognitoId
        createdAt
        email
        name
        pictureName
        updatedAt
        __typename
      }
      teacherEmail
      updatedAt
      __typename
    }
  }
`;
export const getCourseStudent = /* GraphQL */ `
  query GetCourseStudent($id: ID!) {
    getCourseStudent(id: $id) {
      course {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
        teacherEmail
        updatedAt
        __typename
      }
      courseId
      createdAt
      id
      student {
        carne
        cognitoId
        createdAt
        email
        name
        pictureName
        updatedAt
        __typename
      }
      studentId
      updatedAt
      __typename
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($email: String!) {
    getStudent(email: $email) {
      StudentAttendances {
        nextToken
        __typename
      }
      carne
      cognitoId
      courses {
        nextToken
        __typename
      }
      createdAt
      email
      name
      pictureName
      updatedAt
      __typename
    }
  }
`;
export const getStudentAttendance = /* GraphQL */ `
  query GetStudentAttendance($id: ID!) {
    getStudentAttendance(id: $id) {
      attendanceControl {
        available
        courseId
        createdAt
        date
        id
        time
        updatedAt
        __typename
      }
      attendanceControlId
      createdAt
      date
      id
      isPresent
      student {
        carne
        cognitoId
        createdAt
        email
        name
        pictureName
        updatedAt
        __typename
      }
      studentId
      updatedAt
      __typename
    }
  }
`;
export const getStudentByCognitoID = /* GraphQL */ `
  query GetStudentByCognitoID($cognitoId: String!) {
    getStudentByCognitoID(cognitoId: $cognitoId) {
      email
      id
      name
      __typename
    }
  }
`;
export const getTeacher = /* GraphQL */ `
  query GetTeacher($email: String!) {
    getTeacher(email: $email) {
      cognitoId
      courses {
        nextToken
        __typename
      }
      createdAt
      email
      name
      pictureName
      updatedAt
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const listAttendanceControls = /* GraphQL */ `
  query ListAttendanceControls(
    $filter: ModelAttendanceControlFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendanceControls(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        available
        courseId
        createdAt
        date
        id
        time
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCareers = /* GraphQL */ `
  query ListCareers(
    $filter: ModelCareerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCareers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        name
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCourseStudents = /* GraphQL */ `
  query ListCourseStudents(
    $filter: ModelCourseStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        courseId
        createdAt
        id
        studentId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
        teacherEmail
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listStudentAttendances = /* GraphQL */ `
  query ListStudentAttendances(
    $filter: ModelStudentAttendanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentAttendances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        attendanceControlId
        createdAt
        date
        id
        isPresent
        studentId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $email: String
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        carne
        cognitoId
        createdAt
        email
        name
        pictureName
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTeachers = /* GraphQL */ `
  query ListTeachers(
    $email: String
    $filter: ModelTeacherFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeachers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        cognitoId
        createdAt
        email
        name
        pictureName
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        content
        createdAt
        id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
