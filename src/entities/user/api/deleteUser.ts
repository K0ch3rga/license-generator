import { BACKEND_CONNECTION } from '@/shared/config'
import type { User } from '../User'
import { Cookies } from 'quasar'

export const deleteUser = async (user: User) =>
  await fetch(BACKEND_CONNECTION + 'users?id=' + user.id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
      'Content-Type': ' application/json',
    },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as User)
    .catch((e) => Promise.reject(e))
