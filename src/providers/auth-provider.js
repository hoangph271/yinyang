import React, { createContext, useContext, useState, useEffect } from 'react'
import { API_ROOT } from '../consts'
import _ from 'lodash'

const AuthContext = createContext()

const fetchLogin = ({ username, password }) => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loginWithStoredCredentials = async () => {
      // FIXME: Handle loading case...?
      setIsLoading(true)

      const credentials = await navigator.credentials.get({ password: true })

      if (_.isNil(credentials)) return

      const { id: username, password } = credentials
      const res = await fetchLogin({ username, password })

      if (res.ok) {
        const auth = await res.json()
        setAuth(auth)
      }

      setIsLoading(false)
    }

    loginWithStoredCredentials()
  }, [])

  const login = async ({ username, password }) => {
    // FIXME: Handle loading case...?
    setIsLoading(true)

    const res = await fetchLogin({ username, password })

    if (res.ok) {
      try {
        const credentials = new window.PasswordCredential({
          id: username,
          password,
        })
        await navigator.credentials.store(credentials)
      } catch (error) {
        console.error('navigator.credentials.store(credentials) failed...!')
        console.error(error)
      }

      const auth = await res.json()
      setAuth(auth)
    }

    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ auth, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export { AuthContext, AuthProvider, useAuth }
