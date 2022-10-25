import React, {lazy, Suspense} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* Assets */

/* Components */
import { Login } from "./pages/login/Login";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import {Sidebar} from "./components";
import { Navigate } from "react-router-dom";
import {privatesRoutes} from "./config";
// const Students = lazy(() => import("./pages/privates/staff/students/Students"))
// const Student = lazy(() => import("./pages/privates/staff/student/Student"))
// const Users = lazy(() => import("./pages/privates/staff/users/Users"))


export default function App() {
  
  const setRoute = ({ path, key, Component }) => (
    <Route key={key} path={path} element={<Component />} />
  )
  
  const toList = (obj) => Object.keys(obj).map(key => obj[key])

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading</>}>
        <Routes>
          <Route path="/" element={<Navigate to="/students"/>} />
          <Route element={<Sidebar />}>
            {toList(privatesRoutes).map(setRoute)}
            {/* <Route index element={<Students />} /> */}
            {/* <Route path="students/:id" element={<Student />} /> */}
            {/* <Route path="users" element={<Users />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}
