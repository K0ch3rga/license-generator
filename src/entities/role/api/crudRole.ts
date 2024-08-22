import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'
import { type NewRoleDTO, type RoleDto, type Role, RoleDtoToRole } from '../model/'

export const createRole = async (role: NewRoleDTO): Promise<Role> =>
  await fetch(BACKEND_CONNECTION + 'roles/', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
      'Content-Type': ' application/json',
    },
    body: JSON.stringify(role),
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as Role)
    .catch((e) => Promise.reject(e))

export const deleteRole = async (role: Role): Promise<Role> =>
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

export const getAllRoles = async (): Promise<Role[]> =>
  await fetch(BACKEND_CONNECTION + 'roles', {
    headers: { Authorization: 'Bearer ' + Cookies.get('session') },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as RoleDto[])
    .then((r) => r.map((r) => RoleDtoToRole(r)))
    .catch((e) => Promise.reject(e))

export const patchRole = async (role: Role, accessId: number, add: boolean): Promise<Role> =>
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
