import { BACKEND_CONNECTION } from '@/shared/config'
import type { Access } from '../Access'

export const getAllAccesses = (): Promise<Access[]> =>
  fetch(BACKEND_CONNECTION + 'accesses')
    .then((r) => r.json())
    .then((r) => r as Access[])
    .catch((e) => Promise.reject(e))
