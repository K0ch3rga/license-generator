import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const getLicense = async (id: string) => {
  return await fetch(BACKEND_CONNECTION + 'license/' + id, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session')
    }
  })
    .then((r) => r.json())
    .catch((e) => Promise.reject(e))
}

export type License = {
  companyName: string
  productName: string
  licenseNumber: string
  expirationTime: Date
  machineDigestFile: string
  licenseFileName: string
}
