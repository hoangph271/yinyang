import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../providers'
import { useState, useEffect } from 'react'

const useAuthRequired = () => {
  const { auth } = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    setAuthenticated(!!auth)
  }, [auth])

  if (!(auth)) {
    const redirectUrl = encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)
    history.push(`/auth?redirectUrl=${redirectUrl}`)
  }

  return {
    authenticated,
    notAuthenticated: !authenticated,
  }
}

export { useAuthRequired }
