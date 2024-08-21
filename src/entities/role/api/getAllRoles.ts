import { BACKEND_CONNECTION } from '@/shared/config'
import type { Role } from '../Role'
import { Cookies } from 'quasar'
import type { AccessType } from '@/entities/accsses/Access'

export const getAllRoles = async (): Promise<RoleDto[]> =>
  await fetch(BACKEND_CONNECTION + 'roles', {
    headers: { Authorization: 'Bearer ' + Cookies.get('session') },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as RoleDto[])
    .catch((e) => Promise.reject(e))

type RoleDto = Omit<Role, 'accesses'> & { role_accesses: Accesses }
type Accesses = {
  [key: string]: boolean
}

export function RoleDtoToRole(roleDto: RoleDto): Role {
  const accesses = Object.keys(roleDto.role_accesses)
    .filter((key) => roleDto.role_accesses[key])
    .map((v) => v as AccessType)
  return {
    id: roleDto.id,
    name: roleDto.name,
    accesses: accesses,
  }
}
