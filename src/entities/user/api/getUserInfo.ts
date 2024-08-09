import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const getUserInfo = async (): Promise<string> =>
  await fetch(BACKEND_CONNECTION + 'users/me', {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
    },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((u) => u as string)
    .catch((e) => Promise.reject(e))
