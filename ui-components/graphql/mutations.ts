/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAttendanceControl = /* GraphQL */ `
  mutation CreateAttendanceControl(
    $condition: ModelAttendanceControlConditionInput
    $input: CreateAttendanceControlInput!
  ) {
    createAttendanceControl(condition: $condition, input: $input) {
      available
      course {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
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
export const createCareer = /* GraphQL */ `
  mutation CreateCareer(
    $condition: ModelCareerConditionInput
    $input: CreateCareerInput!
  ) {
    createCareer(condition: $condition, input: $input) {
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
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $condition: ModelCourseConditionInput
    $input: CreateCourseInput!
  ) {
    createCourse(condition: $condition, input: $input) {
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
      updatedAt
      __typename
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $condition: ModelStudentConditionInput
    $input: CreateStudentInput!
  ) {
    createStudent(condition: $condition, input: $input) {
      StudentAttendances {
        nextToken
        __typename
      }
      carne
      cognitoId
      courseId
      courses {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
        updatedAt
        __typename
      }
      createdAt
      email
      id
      name
      pictureName
      updatedAt
      __typename
    }
  }
`;
export const createStudentAttendance = /* GraphQL */ `
  mutation CreateStudentAttendance(
    $condition: ModelStudentAttendanceConditionInput
    $input: CreateStudentAttendanceInput!
  ) {
    createStudentAttendance(condition: $condition, input: $input) {
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
        courseId
        createdAt
        email
        id
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $condition: ModelTodoConditionInput
    $input: CreateTodoInput!
  ) {
    createTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteAttendanceControl = /* GraphQL */ `
  mutation DeleteAttendanceControl(
    $condition: ModelAttendanceControlConditionInput
    $input: DeleteAttendanceControlInput!
  ) {
    deleteAttendanceControl(condition: $condition, input: $input) {
      available
      course {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
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
export const deleteCareer = /* GraphQL */ `
  mutation DeleteCareer(
    $condition: ModelCareerConditionInput
    $input: DeleteCareerInput!
  ) {
    deleteCareer(condition: $condition, input: $input) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $condition: ModelCourseConditionInput
    $input: DeleteCourseInput!
  ) {
    deleteCourse(condition: $condition, input: $input) {
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
      updatedAt
      __typename
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $condition: ModelStudentConditionInput
    $input: DeleteStudentInput!
  ) {
    deleteStudent(condition: $condition, input: $input) {
      StudentAttendances {
        nextToken
        __typename
      }
      carne
      cognitoId
      courseId
      courses {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
        updatedAt
        __typename
      }
      createdAt
      email
      id
      name
      pictureName
      updatedAt
      __typename
    }
  }
`;
export const deleteStudentAttendance = /* GraphQL */ `
  mutation DeleteStudentAttendance(
    $condition: ModelStudentAttendanceConditionInput
    $input: DeleteStudentAttendanceInput!
  ) {
    deleteStudentAttendance(condition: $condition, input: $input) {
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
        courseId
        createdAt
        email
        id
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $condition: ModelTodoConditionInput
    $input: DeleteTodoInput!
  ) {
    deleteTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const updateAttendanceControl = /* GraphQL */ `
  mutation UpdateAttendanceControl(
    $condition: ModelAttendanceControlConditionInput
    $input: UpdateAttendanceControlInput!
  ) {
    updateAttendanceControl(condition: $condition, input: $input) {
      available
      course {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
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
export const updateCareer = /* GraphQL */ `
  mutation UpdateCareer(
    $condition: ModelCareerConditionInput
    $input: UpdateCareerInput!
  ) {
    updateCareer(condition: $condition, input: $input) {
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $condition: ModelCourseConditionInput
    $input: UpdateCourseInput!
  ) {
    updateCourse(condition: $condition, input: $input) {
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
      updatedAt
      __typename
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $condition: ModelStudentConditionInput
    $input: UpdateStudentInput!
  ) {
    updateStudent(condition: $condition, input: $input) {
      StudentAttendances {
        nextToken
        __typename
      }
      carne
      cognitoId
      courseId
      courses {
        careerId
        createdAt
        days
        id
        name
        scheduleEnd
        scheduleStart
        updatedAt
        __typename
      }
      createdAt
      email
      id
      name
      pictureName
      updatedAt
      __typename
    }
  }
`;
export const updateStudentAttendance = /* GraphQL */ `
  mutation UpdateStudentAttendance(
    $condition: ModelStudentAttendanceConditionInput
    $input: UpdateStudentAttendanceInput!
  ) {
    updateStudentAttendance(condition: $condition, input: $input) {
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
        courseId
        createdAt
        email
        id
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $condition: ModelTodoConditionInput
    $input: UpdateTodoInput!
  ) {
    updateTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
