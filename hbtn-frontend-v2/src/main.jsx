import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {StudentsContextProvider} from './context'
import {UserContextProvider} from './context/user.context'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <StudentsContextProvider>
        <App />
      </StudentsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
