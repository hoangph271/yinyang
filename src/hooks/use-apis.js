import { API_ROOT } from '../consts'
import { useAuth } from '../providers'

const useApis = () => {
  const { auth } = useAuth()

  const headers = {
    ...auth && { Authorization: `Bearer ${auth.jwt}` },
  }

  const getMedias = async () => fetch(`${API_ROOT}/files`, { headers })
  const getMedia = async ({ _id }) => fetch(`${API_ROOT}/files/${_id}`, { headers })
  const getUser = async ({ _id = '' } = {}) => fetch(`${API_ROOT}/users/${_id}`, { headers })

  return {
    getMedias,
    getMedia,
    getUser,
  }
}

export { useApis }
