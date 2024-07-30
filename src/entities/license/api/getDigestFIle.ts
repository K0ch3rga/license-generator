import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const getDigestFile = async (id: string) => {
  return await fetch(BACKEND_CONNECTION + 'machine_digest_file/' + id, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session')
    }
  })
    .then(async (r) => ({
      filename: r.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1],
      blob: await r.blob()
    }))
    .catch((e) => Promise.reject(e))
}
