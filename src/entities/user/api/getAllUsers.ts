import { BACKEND_CONNECTION } from '@/shared/config'
import type { User } from '../User'

export const getAllUsers = async (): Promise<User[]> =>
  await fetch(BACKEND_CONNECTION + 'users')
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as User[])
    .catch((e) => Promise.reject(e))
