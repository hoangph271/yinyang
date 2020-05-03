import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../providers'

const useAuthRequired = () => {
  const { auth } = useAuth()
  const history = useHistory()
  const location = useLocation()

  if (!(auth)) {
    const redirectUrl = encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)
    history.push(`/auth?redirectUrl=${redirectUrl}`)
  }
}

export { useAuthRequired }
