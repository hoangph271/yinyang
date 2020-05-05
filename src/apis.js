import { API_ROOT } from './consts'

export const getMedias = async () => fetch(`${API_ROOT}/files`)
export const getMedia = async ({ _id }) => fetch(`${API_ROOT}/files/${_id}`)
export const getUser = async ({ _id }) => fetch(`${API_ROOT}/users/${_id}`)
