import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'

export const createRole = (role: RoleCreation): Promise<Role> => {
  return fetch(BACKEND_CONNECTION + 'roles', {
    method: 'POST',
    body: JSON.stringify(role),
  })
    .then((r) => r.json())
    .then((r) => r as Role)
    .catch((e) => Promise.reject(e))
}

export type RoleCreation = {
  name: string
}
