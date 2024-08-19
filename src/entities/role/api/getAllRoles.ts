import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'
import { Cookies } from 'quasar'

export const getAllRoles = async (): Promise<Role[]> =>
  await fetch(BACKEND_CONNECTION + 'roles', {
    headers: { Authorization: 'Bearer ' + Cookies.get('session') },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as Role[])
    .catch((e) => Promise.reject(e))
