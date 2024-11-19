<script setup lang="ts">
import { useUserStore } from "@/entities/user"
import { GenerateLicense } from "@/features/generateLicense"
import { useQuasar } from "quasar"
import { onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"

const $q = useQuasar()
const theme = ref<boolean>(true)
const emits = defineEmits<{ licenseGenerated: [] }>()

const toggleTheme = () => {
  $q.cookies.set("theme", theme.value ? "dark" : "light", {
    expires: 399, // max time allowed by chrome
  })
  $q.dark.set(theme.value)
}

const user = useUserStore()
const routes = useRouter()
const handleLogout = () => {
  user.logout()
  routes.push({ name: "login" })
}

const navigateMain = () => {
  routes.push({ name: "main" })
}
onBeforeMount(() => {
  theme.value = $q.dark.isActive
})
</script>
<template>
  <q-header class="q-px-lg q-py-lg" data-test="header">
    <q-toolbar>
      <div
        class="text-h3 q-mr-md clickable-title title"
        @click="navigateMain"
        data-test="title"
      >
        <q-icon name="sym_s_home" class="home" />
        <span> Генератор лицензий</span>
      </div>
      <GenerateLicense
        @add-license="emits('licenseGenerated')"
        v-if="user.isLogged && user.canCreateLicense"
      />
      <q-space />
      <q-btn-toggle
        unelevated
        rounded
        class="toggle q-mx-sm"
        v-model:="theme"
        :options="[
          { value: false, slot: 'day' },
          { value: true, slot: 'night' },
        ]"
        @update:model-value="toggleTheme"
      >
        <template v-slot:day
          ><q-icon size="14px" class="fill" name="sym_s_clear_day"
        /></template>
        <template v-slot:night
          ><q-icon size="14px" class="fill" name="sym_s_bedtime"
        /></template>
      </q-btn-toggle>
      <q-btn
        v-if="user.isLogged"
        flat
        class="btn btn-link small text-button login"
        icon="svguse:src/shared/assets/man.svg#man| 0 0 100 100"
        :label="user.getLogin"
        :ripple="false"
        data-test="name"
      />
      <q-btn
        v-if="user.isLogged && user.canManageUsersAndRoles"
        flat
        class="btn btn-link q-mr-md"
        icon="svguse:src/shared/assets/gear.svg#gear| 0 0 16 16"
        :ripple="false"
        to="admin"
        data-test="admin"
      />
      <q-btn
        v-if="user.isLogged"
        outline
        flat
        label="Выйти"
        class="btn btn-stroke small"
        @click="handleLogout"
        data-test="logout"
      />
    </q-toolbar>
  </q-header>
</template>
<style scoped lang="sass">
.q-toolbar__title
  flex: 0 1 min-content

.clickable-title
  cursor: pointer

.btn.login.login
  cursor: default
  &:hover
    color: var(--blue1)
  :deep(.q-focus-helper)
    opacity: 0
    background: transparent

.title
  display: flex
  gap: 5px
  align-items: center
  .q-icon.home
    font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24
</style>
