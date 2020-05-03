import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const login = async () => {
    // TODO: Handle login
    const dummy = { username: '@HHP' } // FIXME: Remove dummy
    setAuth(dummy)
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export { AuthContext, AuthProvider, useAuth }
