import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'
import type { NewLicenseDto, LicenseFile, LicenseDto, License } from '../model/'

export const generateLicense = async (
  digestFile: File,
  licenseInfo: NewLicenseDto
): Promise<LicenseFile> => {
  const form = new FormData()
  Object.entries(licenseInfo).forEach((f) => (f[1] ? form.set(f[0], f[1].toString()) : ''))
  form.set('machine_digest_file', digestFile)
  try {
    return await fetch(BACKEND_CONNECTION + 'generate_license', {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
      },
      method: 'POST',
      body: form,
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

export const getAllLicenses = async (): Promise<License[]> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'all_licenses', {
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
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const getLicense = async (id: string): Promise<License> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'license/' + id, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
      },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as License)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}
