import { useUserStore, type UserInfo } from '@/entities/user'
import { decodeJwt } from 'jose'
import { Cookies } from 'quasar'

export const setSessionFromCookies = () => {
  const userStore = useUserStore()
  const jwt = Cookies.get('session')
  if (jwt) userStore.setUser(decodeJwt<UserInfo>(jwt).username)
}
