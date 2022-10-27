import { createContext, useContext, useState } from "react"

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')) ?? null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

// Component
// import context
// const contexstValue = useContext(context)
