import { useCallback, useState, useEffect } from 'react'
import { API_ROOT } from '../consts'
import { useAuth } from '../providers'

const useApis = () => {
  const { auth } = useAuth()
  const [headers, setHeaders] = useState({})

  useEffect(() => {
    setHeaders(prevHeaders => {
      return {
        ...prevHeaders,
        ...auth && { Authorization: `Bearer ${auth.jwt}` },
      }
    })
  }, [auth])

  const postMedia = ({ body }) => fetch(`${API_ROOT}/files`, { method: 'POST', body, headers })
  const getMedias = useCallback(() => fetch(`${API_ROOT}/files`, { headers }), [headers])
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
