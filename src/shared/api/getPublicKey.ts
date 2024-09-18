import { BACKEND_CONNECTION } from '@/shared/config'

export const getPublicKey = async (): Promise<string> =>
  await fetch(BACKEND_CONNECTION + 'public_key')
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r as string)
    .catch((e) => Promise.reject(e))
