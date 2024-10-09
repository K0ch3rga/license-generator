<script setup lang="ts">
import type { Column } from '@/shared/model'
import type { Software } from '..'

const props = defineProps<{ rows: Software[] }>()
const columns: Column[] = [
  { name: 'name', label: 'Название', field: 'name', align: 'left' },
  { name: 'options', label: 'Параметры', field: 'options' },
  { name: 'path', label: 'Путь', field: 'path' },
]
const pagination = { rowsPerPage: 0 }
</script>
<template>
  <q-table
    class="text-body1 max-height"
    :columns="columns"
    :rows="props.rows"
    flat
    hide-bottom
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
  />
</template>
<style scoped lang="sass">
.max-height
  height: calc( 100vh - 98px - 36px - 16px - 32px) // full - header - tabs - bottom margin - tab panel padding
</style>
