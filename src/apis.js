import { API_ROOT } from './consts'

export const fetchMedias = async () => fetch(`${API_ROOT}/files`)
export const fetchMedia = async ({ _id }) => fetch(`${API_ROOT}/files/${_id}`)
export const fetchUser = async ({ _id }) => fetch(`${API_ROOT}/users/${_id}`)
