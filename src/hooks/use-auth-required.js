import { useHistory } from 'react-router-dom'
import { useAuth } from '../providers'

const useAuthRequired = () => {
  const { auth } = useAuth()
  const history = useHistory()

  if (!(auth)) {
    return history.push('/auth')
  }
}

export { useAuthRequired }
