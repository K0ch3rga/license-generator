<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'

onMounted(() => {
  const $q = useQuasar()

  const theme = $q.cookies.get('theme')
  if (theme) $q.dark.set(theme == 'dark')

  $q.iconSet.table.arrowUp = 'sym_s_arrow_drop_down'
  $q.iconSet.arrow.dropdown = 'sym_s_keyboard_arrow_down'
})
</script>

<template>
  <q-layout view="hHh lpR lFf">
    <router-view />
  </q-layout>
</template>

<style lang="sass">
@import '@/shared/ui/components.sass'
</style>
