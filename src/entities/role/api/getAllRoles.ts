import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'

export const getAllRoles = (): Promise<Role[]> => {
  return fetch(BACKEND_CONNECTION + 'roles')
    .then((r) =>
      r
        .json()
        .then((roles) => roles as Role[])
        .catch((e) => Promise.reject(e))
    )
    .catch((e) => Promise.reject(e))
}
