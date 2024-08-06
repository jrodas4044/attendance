/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttendanceControl = /* GraphQL */ `
  subscription OnCreateAttendanceControl(
    $filter: ModelSubscriptionAttendanceControlFilterInput
  ) {
    onCreateAttendanceControl(filter: $filter) {
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
export const onCreateCareer = /* GraphQL */ `
  subscription OnCreateCareer($filter: ModelSubscriptionCareerFilterInput) {
    onCreateCareer(filter: $filter) {
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
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
export const onCreateCourseStudent = /* GraphQL */ `
  subscription OnCreateCourseStudent(
    $filter: ModelSubscriptionCourseStudentFilterInput
  ) {
    onCreateCourseStudent(filter: $filter) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
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
export const onCreateStudentAttendance = /* GraphQL */ `
  subscription OnCreateStudentAttendance(
    $filter: ModelSubscriptionStudentAttendanceFilterInput
  ) {
    onCreateStudentAttendance(filter: $filter) {
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
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onCreateTeacher(filter: $filter) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAttendanceControl = /* GraphQL */ `
  subscription OnDeleteAttendanceControl(
    $filter: ModelSubscriptionAttendanceControlFilterInput
  ) {
    onDeleteAttendanceControl(filter: $filter) {
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
export const onDeleteCareer = /* GraphQL */ `
  subscription OnDeleteCareer($filter: ModelSubscriptionCareerFilterInput) {
    onDeleteCareer(filter: $filter) {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
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
export const onDeleteCourseStudent = /* GraphQL */ `
  subscription OnDeleteCourseStudent(
    $filter: ModelSubscriptionCourseStudentFilterInput
  ) {
    onDeleteCourseStudent(filter: $filter) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
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
export const onDeleteStudentAttendance = /* GraphQL */ `
  subscription OnDeleteStudentAttendance(
    $filter: ModelSubscriptionStudentAttendanceFilterInput
  ) {
    onDeleteStudentAttendance(filter: $filter) {
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
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onDeleteTeacher(filter: $filter) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAttendanceControl = /* GraphQL */ `
  subscription OnUpdateAttendanceControl(
    $filter: ModelSubscriptionAttendanceControlFilterInput
  ) {
    onUpdateAttendanceControl(filter: $filter) {
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
export const onUpdateCareer = /* GraphQL */ `
  subscription OnUpdateCareer($filter: ModelSubscriptionCareerFilterInput) {
    onUpdateCareer(filter: $filter) {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
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
export const onUpdateCourseStudent = /* GraphQL */ `
  subscription OnUpdateCourseStudent(
    $filter: ModelSubscriptionCourseStudentFilterInput
  ) {
    onUpdateCourseStudent(filter: $filter) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
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
export const onUpdateStudentAttendance = /* GraphQL */ `
  subscription OnUpdateStudentAttendance(
    $filter: ModelSubscriptionStudentAttendanceFilterInput
  ) {
    onUpdateStudentAttendance(filter: $filter) {
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
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onUpdateTeacher(filter: $filter) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
