import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<string>('')

  const isLogged = computed(() => !!user.value)
  const getLogin = computed(() => user.value)

  function setUser(login: string) {
    const time = new Date().getTime() + 7200000 // 2h
    user.value = login
    Cookies.set('session', login, { expires: new Date(time).toUTCString() })
  }

  function logout() {
    Cookies.remove('session')
    user.value = ''
  }

  return { isLogged, getLogin, setUser, logout }
})
