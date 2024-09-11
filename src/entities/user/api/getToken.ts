import { BACKEND_CONNECTION } from '@/shared/config'

export const getToken = async (login: string, password: string): Promise<Token> => {
  const form = new FormData()
  form.append('username', login)
  form.append('password', password)
  try {
    return await fetch(BACKEND_CONNECTION + 'token', {
      method: 'POST',
      body: form,
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as Token)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export type Token = {
  access_token: string
  token_type: string
}
