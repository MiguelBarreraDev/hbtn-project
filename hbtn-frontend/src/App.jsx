import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* Assets */

/* Components */
import { Layout } from "./pages/Layout";
import { Login } from "./pages/login/Login";
import { AdminHome } from "./pages/adminHome/AdminHome";
import { AdminEditUsers } from "./pages/adminEditUsers/AdminEditUsers";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import { Students } from "./pages/adminHome/subcomponents/studentsComponent/Students";
import { Student } from "./pages/adminHome/subcomponents/studentComponent/Student";


export function App() {
  return (
    <BrowserRouter>
        
      <Routes>
        <Route path="/login" index element={<Login />} />
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<AdminHome />} />
          <Route path="/students" element={<Students />} />
          <Route path="student/:id" element={<Student />} />
        </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  );
}
