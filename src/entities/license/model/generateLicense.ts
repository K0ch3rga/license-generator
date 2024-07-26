import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const generateLicense = async (digestFile: File | undefined, licenseInfo: LicenseInfo) => {
  const form = new FormData()
  form.set('company_name', licenseInfo.company_name)
  form.set('product_name', licenseInfo.product_name)
  form.set('license_users_count', licenseInfo.license_users_count.toString())
  form.set('exp_time', licenseInfo.exp_time.replace('.', '-').replace('.', '-'))
  if (digestFile) form.set('machine_digest_file', digestFile)
  return await fetch(BACKEND_CONNECTION + 'generate_license', {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session')
    },
    method: 'POST',
    body: form
  })
    .then(async (r) => ({
      filename: r.headers.get('Content-Disposition'),
      blob: await r.blob()
    }))
    .catch((e) => Promise.reject(e))
}

export type LicenseInfo = {
  company_name: string
  product_name: string
  license_users_count: number
  exp_time: string
}
