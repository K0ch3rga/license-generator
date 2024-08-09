import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const getLicense = async (id: string) =>
  await fetch(BACKEND_CONNECTION + 'license/' + id, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
    },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .catch((e) => Promise.reject(e))
