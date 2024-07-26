import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'

export const getToken = async (login: string, password: string): Promise<Token> => {
  const form = new FormData()
  form.append('username', login)
  form.append('password', password)
  return await fetch(BACKEND_CONNECTION + 'token', {
    method: 'POST',
    body: form
  })
    .then(async (r) => {
      if (r.ok) {
        return r
          .json()
          .then((t) => t as Token)
          .catch((e) => Promise.reject(e))
      } else {
        return Promise.reject(r.status)
      }
    })
    .catch((e) => Promise.reject(e))
}

export type Token = {
  access_token: string
  token_type: string
}

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
