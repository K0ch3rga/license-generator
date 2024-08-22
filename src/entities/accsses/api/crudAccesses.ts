import { BACKEND_CONNECTION } from '@/shared/config'
import type { Access } from '../Access'
import { Cookies } from 'quasar'

export const getAllAccesses = async (): Promise<Access[]> =>
  await fetch(BACKEND_CONNECTION + 'accesses', {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
    },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as Access[])
    .catch((e) => Promise.reject(e))
