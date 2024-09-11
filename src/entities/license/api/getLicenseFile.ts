import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'
import type { LicenseFile } from '../model'

export const getLicenseFile = async (id: string): Promise<LicenseFile> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'license/' + id, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
      },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then(async (r) => ({
        filename: r.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1],
        blob: await r.blob(),
      }))
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}
