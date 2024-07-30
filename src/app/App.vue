<script setup lang="ts">
import { LicensePage } from "@/pages/licensePage"
import { LoginPage } from "@/pages/loginPage"
import { getUserInfo, useUserStore, type UserInfo } from "@/entities/user"
import { useQuasar } from "quasar"
import { decodeJwt } from "jose"

const $q = useQuasar()

const theme = $q.cookies.get("theme")
if (theme) $q.dark.set(theme == "dark")
else $q.dark.set("auto")

$q.iconSet.table.arrowUp = "sym_s_arrow_drop_down"

const user = useUserStore()
getUserInfo()
  .then((u) => {
    u != "null"
      ? user.setUser(decodeJwt<UserInfo>(u).username)
      : console.log("no user")
  })
  .catch((e) => console.log(e))
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <LicensePage v-if="user.isLogged" />
    <LoginPage v-else />
  </q-layout>
</template>

<style lang="sass">
@import '@/shared/ui/components.sass'
</style>
