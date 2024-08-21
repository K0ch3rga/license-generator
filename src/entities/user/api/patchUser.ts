import { BACKEND_CONNECTION } from '@/shared/config'
import type { User } from '../User'
import { Cookies } from 'quasar'

export const patchUser = async (user: User, roleId: number, add: boolean) =>
  await fetch(BACKEND_CONNECTION + 'users/' + user.id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
      'Content-Type': ' application/json',
    },
    body: JSON.stringify({ user_id: user.id, role_id: roleId, added: add }),
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as User)
    .catch((e) => Promise.reject(e))
