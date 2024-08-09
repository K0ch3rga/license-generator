import { BACKEND_CONNECTION } from '@/shared/config'
import type { License } from '../License'
import { Cookies } from 'quasar'

export const getAllLicenses = async (): Promise<License[]> =>
  await fetch(BACKEND_CONNECTION + 'all_licenses', {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session'),
    },
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r['all_licenses'] as LicenseDto[])
    .then((r) =>
      r.map(
        (l): License => ({
          companyName: l.company_name,
          expirationTime: new Date(Date.parse(l.exp_time)),
          licenseFileName: l.lic_file_name,
          licenseNumber: l.id.toString(),
          machineDigestFile: l.machine_digest_file,
          productName: l.product_name,
        })
      )
    )
    .catch((e) => Promise.reject(e))

export const getErrorByCode = (code: number) =>
  getAllCodes.get(code) ?? 'Сервер не отвечает'

const getAllCodes = new Map<number, string>()
getAllCodes.set(401, 'Вы не авторизованы')

type LicenseDto = {
  company_name: string
  exp_time: string
  id: number
  lic_file_name: string
  lic_num: string
  machine_digest_file: string
  product_name: string
}
