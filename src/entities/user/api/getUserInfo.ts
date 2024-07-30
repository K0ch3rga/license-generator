import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const getUserInfo = async (): Promise<string> => {
  return await fetch(BACKEND_CONNECTION + 'users/me', {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session')
    }
  })
    .then((r) =>
      r
        .json()
        .then((u) => u)
        .catch((e) => Promise.reject(e))
    )
    .catch((e) => Promise.reject(e))
}