<script setup lang="ts">
import {
  getAllLicenses,
  type License,
  getLicenseFile,
  getDigestFile,
} from '@/entities/license'
import { exportTable } from '../model'
import { type Column } from '@/shared/model'
import { onMounted, ref } from 'vue'
import { exportFile, date } from 'quasar'

const licenses = ref<License[]>([])
const error = ref('')
const loading = ref(false)
const filter = ref('')
const pagination = ref({ rowsPerPage: 0 })

const refreshLicenses = () => {
  loading.value = true
  getAllLicenses()
    .then((l) => (licenses.value = l))
    .catch((e) => (error.value = e))
    .finally(() => (loading.value = false))
}
onMounted(refreshLicenses)

const downloadLicenseFile = (id: string) => {
  getLicenseFile(id).then((r) =>
    exportFile(r.filename ?? 'license file', r.blob)
  )
}

const downloadDigestFile = (id: string) => {
  getDigestFile(id).then((r) => exportFile(r.filename ?? 'digest file', r.blob))
}

const columns: Column[] = [
  {
    name: 'license',
    label: 'Номер лицензии',
    field: (l: License) => l.licenseNumber,
    align: 'left',
    required: true,
    sortable: true,
    sort: (a: number, b: number) => a - b,
  },
  {
    name: 'name',
    label: 'Название продукта',
    field: (l: License) => l.productName,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'expiration',
    label: 'Время окончания',
    field: (l: License) => date.formatDate(l.expirationTime, 'D.M.YYYY'),
    align: 'left',
    required: true,
    sortable: true,
    //TODO Перенести сортировку в api // Я запутался зачем она в api, это же метод для сортировки в таблице
    sort: (a, b, aRow, bRow) =>
      aRow['expirationTime'].getTime() - bRow['expirationTime'].getTime(),
  },
  {
    name: 'digest',
    label: 'Файл аппаратных ресурсов',
    field: (l: License) => l.machineDigestFile,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'licenseFile',
    label: 'Файл лицензии',
    field: (l: License) => l.licenseFileName,
    align: 'left',
    required: true,
    sortable: true,
  },
]
</script>
<template>
  <q-input
    outlined
    class="q-mx-md text-input"
    placeholder="Поиск"
    v-model="filter"
  >
    <template v-slot:append>
      <q-icon size="10.5px" name="img:src/shared/assets/search.svg" />
    </template>
  </q-input>
  <q-table
    class="q-mx-md max-height-table text-body1"
    flat
    hide-bottom
    binary-state-sort
    :rows="licenses"
    row-key="licenseNumber"
    :columns="columns"
    :filter="filter"
    :loading="loading"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    hide-no-data
  >
    <template v-slot:top-right>
      <q-btn
        flat
        class="btn btn-stroke small"
        label="Экспорт в csv"
        no-caps
        @click="() => exportTable(licenses, columns)"
      />
    </template>
    <template v-slot:body-cell-licenseFile="props">
      <q-td
        key="licenseFile"
        :props="props"
        class="pressable"
        @click="() => downloadLicenseFile(props.row.licenseNumber)"
      >
        {{ props.value }}
      </q-td>
    </template>
    <template v-slot:body-cell-digest="props">
      <q-td
        key="digest"
        :props="props"
        class="pressable"
        @click="() => downloadDigestFile(props.row.licenseNumber)"
      >
        {{ props.value }}
      </q-td>
    </template>

    <!-- <template v-slot:header-cell="props">
      <q-th :props="props"> </q-th>
    </template> -->
  </q-table>
</template>
<style lang="sass">
.max-height-table
  height: calc( 100vh - 98px - 24px )

.pressable
  cursor: pointer
  &:hover
    text-decoration: underline

.q-toolbar
  .q-toolbar-title
    flex-grow: 0
</style>
