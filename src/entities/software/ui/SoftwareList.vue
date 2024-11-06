<script setup lang="ts">
import type { Column } from "@/shared/model"
import type { Software } from ".."
import { ref } from "vue"

const props = defineProps<{ rows: Software[] }>()
const emits = defineEmits<{
  add: []
  delete: [Software[]]
  edit: [Software]
  addOption: [Software, string]
  deleteOption: [Software, string]
}>()
const columns: Column[] = [
  {
    name: "company_name",
    label: "Название",
    field: "company_name",
    align: "left",
  },
  {
    name: "required_attributes",
    label: "Параметры",
    field: "required_attributes",
    align: "left",
  },
  {
    name: "license_generator_path",
    label: "Путь",
    field: "license_generator_path",
  },
]
const pagination = { rowsPerPage: 0 }
const selected = ref<Software[]>([])
</script>
<template>
  <q-table
    class="text-body1 max-height"
    :columns="columns"
    :rows="props.rows"
    flat
    hide-bottom
    selection="multiple"
    v-model:selected="selected"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
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
        label="Изменить"
        @click="emits('edit', selected[0])"
      />
      <q-btn
        flat
        class="btn btn-fill text-button small q-mx-xs"
        label="Удалить"
        @click="emits('delete', selected)"
      />
    </template>
    <template v-slot:body-cell-required_attributes="cellProps">
      <q-td>
        <q-select
          v-model="cellProps.row[cellProps.col.name]"
          @add="(option) => emits('addOption', cellProps.row, option.value)"
          @remove="
            (option) => emits('deleteOption', cellProps.row, option.value)
          "
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
          outlined
          rounded
          class="q-my-xs select text-body1"
        />
        <q-tooltip
          :delay="1000"
          anchor="bottom start"
          self="center left"
          :offset="[-15, 4]"
        >
          Нажмите Enter для подтверждения
        </q-tooltip>
      </q-td>
    </template>
  </q-table>
</template>
<style scoped lang="sass">
.max-height
  height: calc( 100vh - 98px - 36px - 16px - 32px) // full - header - tabs - bottom margin - tab panel padding
.scroll
  overflow-x: scroll
  overflow-y: hidden
  flex-wrap: nowrap
  height: 40px
  width: calc(100vw - 340px)
</style>
