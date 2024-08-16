<script setup lang="ts">
import type { Role } from '@/entities/role'
import type { User } from '@/entities/user'
import type { Column } from '@/shared/model'
import { ref } from 'vue'

const props = defineProps<{
  columns: Column[]
  rows: Role[] | User[]
  options: string[]
}>()
const emits = defineEmits<{ add: []; delete: [Role[] | User[]]; update: [] }>()
const selected = ref<Role[] | User[]>([])
</script>
<template>
  <q-table
    class="text-body1"
    flat
    hide-bottom
    :columns="columns"
    :rows="rows"
    row-key="id"
    selection="single"
    v-model:selected="selected"
  >
    <template v-slot:top>
      <q-space />
      <q-btn
        flat
        class="btn btn-fill text-button small q-mx-xs"
        label="Добавить"
        @click="emits('add')"
      />
      <q-btn
        flat
        class="btn btn-fill text-button small q-mx-xs"
        label="Удалить"
        @click="emits('delete', selected)"
      />
      <q-btn
        flat
        class="btn btn-fill text-button small q-mx-xs"
        label="Обновить"
        @click="emits('update')"
      />
    </template>
    <template v-slot:body-cell-selection="props">
      <q-td>{{ props.value }}</q-td>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props" class="small-name-col">
        {{ props.value }}
      </q-td>
    </template>
    <template v-slot:body-cell="cellProps">
      <q-td>
        <q-select
          :options="props.options"
          v-model="cellProps.row[cellProps.col.name]"
          multiple
          rounded
          outlined
          dense
          hide-bottom-space
          menu-anchor="top left"
          class="q-my-xs select text-body1"
        />
      </q-td>
    </template>
  </q-table>
</template>
<style scoped lang="sass">
.small-name-col
  width:1px
</style>
