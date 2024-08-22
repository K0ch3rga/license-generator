import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { computed, ref } from 'vue'
import { AccessType } from '@/entities/accsses/Access'
import type { JWTPayload } from 'jose'

export const useUserStore = defineStore('user', () => {
  const user = ref<string>('')
  const claims = ref<AccessType[]>([])

  const isLogged = computed(() => !!user.value)
  const getLogin = computed(() => user.value)
  const canListLicense = computed(() =>
    claims.value.includes(AccessType.READ_LICENSE)
  )
  const canDownloadFile = computed(() =>
    claims.value.includes(AccessType.RETRIEVE_FILE)
  )
  const canCreateLicense = computed(() =>
    claims.value.includes(AccessType.CREATE_LICENSE)
  )
  const canManageUsersAndRoles = computed(() =>
    claims.value.includes(AccessType.USER_ROLE_MANAGEMENT)
  )

  function setUserFromJWT(jwt: UserInfo & JWTPayload) {
    if (jwt.sub) {
      user.value = jwt.sub
      claims.value = jwt.claims
    }
  }

  function logout() {
    $reset()
  }

  function $reset() {
    Cookies.remove('session')
    user.value = ''
  }

  return {
    isLogged,
    getLogin,
    setUserFromJWT,
    logout,
    canListLicense,
    canDownloadFile,
    canCreateLicense,
    canManageUsersAndRoles,
  }
})

export type UserInfo = { claims: AccessType[] }
