import { lazy } from "react"

export const publicsRoutes = {
  LOGIN: {
    name: 'Login',
    path: '/login',
    key: 'login',
    Component: lazy(() => import('@/pages/login/Login'))
  }
}

export const privatesRoutes = {
  STUDENTS: {
    name: 'Students',
    path: 'students',
    key: 'students',
    Component: lazy(() => import('@/pages/privates/staff/students/Students'))
  },
  STUDENT: {
    name: 'Student',
    path: 'students/:id',
    key: 'student',
    Component: lazy(() => import('@/pages/privates/staff/student/Student'))
  },
  REPORTS: {
    name: 'Report',
    path: 'students/:id/reports',
    key: 'reports',
    Component: lazy(() => import('@/pages/privates/staff/student/Student'))
  },
  USERS: {
    name: 'Users',
    path: 'users',
    key: 'users',
    Component: lazy(() => import('@/pages/privates/staff/users/Users'))
  }
}
