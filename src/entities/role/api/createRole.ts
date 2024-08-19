import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'
import { Cookies } from 'quasar'

export const createRole = async (role: RoleCreation): Promise<Role> =>
  await fetch(BACKEND_CONNECTION + 'roles', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + Cookies.get('session') },
    body: JSON.stringify(role),
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as Role)
    .catch((e) => Promise.reject(e))

export type RoleCreation = {
  name: string
}
