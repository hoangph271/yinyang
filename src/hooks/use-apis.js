import { API_ROOT } from '../consts'
import { useAuth } from '../providers'

const useApis = () => {
  const { auth } = useAuth()

  const headers = {
    ...auth && { Authorization: `Bearer ${auth.jwt}` },
  }

  const fetchMedias = async () => fetch(`${API_ROOT}/files`, { headers })
  const fetchMedia = async ({ _id }) => fetch(`${API_ROOT}/files/${_id}`, { headers })
  const fetchUser = async ({ _id = '' } = {}) => fetch(`${API_ROOT}/users/${_id}`, { headers })

  return {
    fetchMedias,
    fetchMedia,
    fetchUser,
  }
}

export { useApis }
