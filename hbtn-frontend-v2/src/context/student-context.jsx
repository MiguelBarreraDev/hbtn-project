import { createContext, useContext, useState } from "react"

const StudentsContext = createContext(null)

export const StudentsContextProvider = ({ children }) => {
  const [students, setStudents] = useState([])

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  )
}

export const useStudents = () => useContext(StudentsContext)
