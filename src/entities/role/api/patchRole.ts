import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'
import { Cookies } from 'quasar'

export const patchRole = async (role: Role, accessId: number, add: boolean) =>
  await fetch(BACKEND_CONNECTION + 'roles/' + role.id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
      'Content-Type': ' application/json',
    },
    body: JSON.stringify({
      role_id: role.id,
      access_id: accessId,
      has_access: add,
    }),
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as Role)
    .catch((e) => Promise.reject(e))
