import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'
import { Cookies } from 'quasar'

export const deleteRole = async (role: Role) =>
  await fetch(BACKEND_CONNECTION + 'roles?id=' + role.id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
      'Content-Type': ' application/json',
    },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as Role)
    .catch((e) => Promise.reject(e))
