import { defineStore } from "pinia"
import { Cookies } from "quasar"
import { computed, ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const user = ref<string>("")

  const isLogged = computed(() => !!user.value)
  const getLogin = computed(() => user.value)

  function setUser(login: string) {
    user.value = login
  }

  function logout() {
    $reset()
  }

  function $reset() {
    Cookies.remove("session")
    user.value = ""
  }

  return { isLogged, getLogin, setUser, logout }
})

export type UserInfo = {
  username: string
  authorities: string[]
}
