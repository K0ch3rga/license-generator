import { BACKEND_CONNECTION } from '@/shared/config'
import type { User } from '../User'

export const createUser = () =>
  fetch(BACKEND_CONNECTION + 'users')
    .then((r) => r.json())
    .then((r) => r as User)
    .catch((e) => Promise.reject(e))
