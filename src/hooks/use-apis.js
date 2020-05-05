import { API_ROOT } from '../consts'
import { useAuth } from '../providers'

const useApis = () => {
  const { auth } = useAuth()

  const headers = {
    ...auth && { Authorization: `Bearer ${auth.jwt}` },
  }

  const postMedia = ({ body }) => fetch(`${API_ROOT}/files`, { method: 'POST', body, headers })
  const getMedias = () => fetch(`${API_ROOT}/files`, { headers })
  const getMedia = ({ _id }) => fetch(`${API_ROOT}/files/${_id}`, { headers })
  const getUser = ({ _id = '' } = {}) => fetch(`${API_ROOT}/users/${_id}`, { headers })

  return {
    postMedia,
    getMedias,
    getMedia,
    getUser,
  }
}

export { useApis }
