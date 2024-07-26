<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import { GenerateLicense } from '@/features/generateLicense'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const theme = ref($q.dark.isActive)
const emits = defineEmits<{ licenseGenerated: [] }>()

const toggleTheme = () => {
  $q.cookies.set('theme', theme.value ? 'dark' : 'light', {
    expires: 399 // max time allowed by chrome
  })
  $q.dark.set(theme.value)
}

const user = useUserStore()
</script>
<template>
  <q-header class="q-px-lg q-py-lg">
    <q-toolbar>
      <q-toolbar-title class="text-h3"> Генератор лицензий </q-toolbar-title>
      <div class="grow">
        <GenerateLicense @add-license="emits('licenseGenerated')" v-if="user.isLogged" />
      </div>
      <q-btn-toggle
        unelevated
        rounded
        class="toggle q-mx-sm"
        v-model:="theme"
        :options="[
          { value: false, slot: 'day' },
          { value: true, slot: 'night' }
        ]"
        @update:model-value="toggleTheme"
      >
        <template v-slot:day><q-icon size="14px" class="fill" name="sym_s_clear_day" /></template>
        <template v-slot:night><q-icon size="14px" class="fill" name="sym_s_bedtime" /></template>
      </q-btn-toggle>
      <q-btn
        v-if="user.isLogged"
        flat
        class="btn btn-link small text-button q-mx-sm"
        icon="svguse:src/shared/assets/man.svg#man| 0 0 100 100"
        :label="user.getLogin"
        :ripple="false"
      />
      <q-btn
        v-if="user.isLogged"
        outline
        flat
        label="Выйти"
        class="btn btn-stroke small"
        @click="() => user.logout()"
      />
    </q-toolbar>
  </q-header>
</template>
<style scoped lang="sass">
.q-toolbar__title
  flex: 0 1 min-content
div.grow
  flex: 1 1 min-content
</style>
