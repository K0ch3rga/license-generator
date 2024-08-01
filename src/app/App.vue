<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

const theme = $q.cookies.get('theme')
if (theme) $q.dark.set(theme == 'dark')
else $q.dark.set('auto')

$q.iconSet.table.arrowUp = 'sym_s_arrow_drop_down'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <router-view />
  </q-layout>
</template>

<style lang="sass">
@import '@/shared/ui/components.sass'
</style>
