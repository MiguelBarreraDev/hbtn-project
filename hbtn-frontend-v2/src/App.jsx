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
import { Sidebar } from "./components";
import { privatesRoutes } from "./config";
import { useUser } from "./context/user.context";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useAuth } from "./hooks";

function PrivateGuard () {
  const { isLogged } = useAuth()
  
  return isLogged
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
    <Provider store={store}>
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
    </Provider>
  );
}
