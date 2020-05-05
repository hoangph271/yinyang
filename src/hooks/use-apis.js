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

  const postMedia = useCallback(({ body }) => fetch(`${API_ROOT}/files`, { method: 'POST', body, headers }), [headers])
  const getMedias = useCallback(({ page = 0 } = {}) => {
    return fetch(`${API_ROOT}/files?page=${page}`, { headers })
  }, [headers])
  const getMedia = useCallback(({ _id }) => fetch(`${API_ROOT}/files/${_id}`, { headers }), [headers])
  const getUser = useCallback(({ _id = '' } = {}) => fetch(`${API_ROOT}/users/${_id}`, { headers }), [headers])

  return {
    postMedia,
    getMedias,
    getMedia,
    getUser,
  }
}

export { useApis }
