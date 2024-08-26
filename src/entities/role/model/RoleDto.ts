import type { Role } from './Role'

export type RoleDto = Omit<Role, 'accesses'> & { role_accesses: Accesses }
type Accesses = {
  [key: string]: boolean
}

export const RoleDtoToRole = (RoleDto: RoleDto): Role => ({
  id: RoleDto.id,
  name: RoleDto.name,
  accesses: Object.entries(RoleDto.role_accesses)
    .filter(([key]) => RoleDto.role_accesses[key])
    .map((v) => v[0]),
})
