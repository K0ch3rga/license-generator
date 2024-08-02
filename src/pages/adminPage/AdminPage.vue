<script setup lang="ts">
import { Header } from '@/widgets/header'
import type { Column } from '@/widgets/listLicenses/model'
import { ref } from 'vue'

const table = ref<string>('users')

const authoritiesColumns = ref<Column[]>([
  { field: 'authority', name: 'authority', label: 'Authority', align: 'left' },
  { field: 'user', name: 'user', label: 'User', align: 'left' },
  { field: 'manager', name: 'manager', label: 'Manager', align: 'left' },
  { field: 'developer', name: 'developer', label: 'Developer', align: 'left' },
])
const authorities = ref([
  { authority: 'READ_LICENSE', user: true, manager: true, developer: true },
  { authority: 'CREATE_LICENSE', user: false, manager: true, developer: true },
  { authority: 'READ_REPORT', user: false, manager: false, developer: true },
  { authority: 'RETRIVE_FILE', user: false, manager: false, developer: true },
])

const usersData = ref([
  {
    email: 'admin',
    name: 'admin',
    role: authoritiesColumns.value[3].label,
  },
  {
    email: 'oleg@example.com',
    name: 'not oleg',
    role: authoritiesColumns.value[1].label,
  },
  {
    email: 'igor@example.com',
    name: 'definetly igor',
    role: authoritiesColumns.value[1].label,
  },
])
const userCoulumns = ref<Column[]>([
  { field: 'email', name: 'email', label: 'Email', align: 'left' },
  { field: 'name', name: 'name', label: 'Name', align: 'left' },
  { field: 'role', name: 'role', label: 'Role', align: 'left' },
])
const roleSelectOptions = ref(['User', 'Manager', 'Developer'])
</script>
<template>
  <Header />
  <q-page-container>
    <q-page>
      <div class="padded q-mr-md">
        <q-table
          class="text-body1"
          v-if="table == 'roles'"
          flat
          hide-bottom
          :columns="authoritiesColumns"
          :rows="authorities"
        >
          <template v-slot:top>
            <q-space />
            <q-btn
              flat
              class="btn btn-fill text-button small q-mx-xs"
              label="Добавить"
            />
            <q-btn
              flat
              class="btn btn-fill text-button small q-mx-xs"
              label="Удалить"
            />
            <q-btn
              flat
              class="btn btn-fill text-button small q-mx-xs"
              label="Обновить"
            />
          </template>
          <template v-slot:body-cell-authority="props">
            <q-td :props="props">
              {{ props.value }}
            </q-td>
          </template>
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <q-checkbox
                :model-value="props.value"
                class="checkbox"
                size="32px"
              />
            </q-td>
          </template>
        </q-table>

        <q-table
          class="text-body1 q-pb-xs"
          v-if="table == 'users'"
          flat
          hide-bottom
          :columns="userCoulumns"
          :rows="usersData"
        >
          <template v-slot:top>
            <q-space />
            <q-btn
              flat
              class="btn btn-fill text-button small q-mx-xs"
              label="Добавить"
            />
            <q-btn
              flat
              class="btn btn-fill text-button small q-mx-xs"
              label="Удалить"
            />
            <q-btn
              flat
              class="btn btn-fill text-button small q-mx-xs"
              label="Обновить"
            />
          </template>
          <template v-slot:body-cell-role="props">
            <q-td :props="props">
              <q-select
                outlined
                rounded
                dense
                options-dense
                class="select text-body1"
                :model-value="props.value"
                :options="roleSelectOptions"
              />
            </q-td>
          </template>
        </q-table>
      </div>
      <q-page-sticky expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn
            flat
            :ripple="false"
            align="left"
            class="menu-item text-body1"
            :class="table == 'users' ? 'active' : ''"
            @click="() => (table = 'users')"
            >Пользователи
          </q-btn>
          <q-btn
            flat
            :ripple="false"
            align="left"
            class="menu-item text-body1"
            :class="table == 'roles' ? 'active' : ''"
            @click="() => (table = 'roles')"
            >Роли
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page>
  </q-page-container>
</template>
<style scoped lang="sass">
.padded
  padding-left: 168px

.menu-item
  border-radius: 8px
  &.active
    color: var(--blue1)
</style>
