import { BACKEND_CONNECTION } from '@/shared/config'
import type { User } from '../User'
import { Cookies } from 'quasar'

export const createUser = async (user: NewUserDTO) =>
  await fetch(BACKEND_CONNECTION + 'users', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + Cookies.get('session') },
    body: JSON.stringify(user),
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as User)
    .catch((e) => Promise.reject(e))

export type NewUserDTO = {
  username: string
}
