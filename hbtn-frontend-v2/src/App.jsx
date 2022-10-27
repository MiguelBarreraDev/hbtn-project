import React, {lazy, Suspense, useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

/* Assets */

/* Components */
import { Login } from "./pages/login/Login";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import {Sidebar} from "./components";
import {privatesRoutes} from "./config";
import {useUser} from "./context/user.context";
// const Students = lazy(() => import("./pages/privates/staff/students/Students"))
// const Student = lazy(() => import("./pages/privates/staff/student/Student"))
// const Users = lazy(() => import("./pages/privates/staff/users/Users"))


function PrivateGuard () {
  const { user, setUser } = useUser()
  
  return user
    ? <Outlet/>
    : <Navigate to='/login' />
}

export default function App() {
  const { user } = useUser()
  
  const setRoute = ({ path, key, Component }) => (
    <Route key={key} path={path} element={<Component />} />
  )

  const toList = (obj) => Object.keys(obj).map(key => obj[key])

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading</>}>
        <Routes>
          <Route path='/' element={<Navigate to={user ? '/students' : '/login'} />}/>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateGuard />}>
            <Route element={<Sidebar />}>
              {toList(privatesRoutes).map(setRoute)}
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}
