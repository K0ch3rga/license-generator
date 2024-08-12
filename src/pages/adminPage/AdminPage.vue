<script setup lang="ts">
import { getAllAccesses } from '@/entities/accsses/api'
import type { Role } from '@/entities/role'
import { getAllRoles } from '@/entities/role/api'
import { getAllUsers } from '@/entities/user/api/getAllUsers'
import type { User } from '@/entities/user/User'
import { Header } from '@/widgets/header'
import type { Column } from '@/widgets/listLicenses/model'
import { onBeforeMount, ref } from 'vue'

const table = ref<string>('users')

const authoritiesColumns = ref<Column[]>([
  {
    field: 'name',
    name: 'name',
    label: 'Role',
    align: 'left',
  },
  {
    field: 'READ_LICENSE',
    name: 'READ_LICENSE',
    label: 'READ_LICENSE',
    align: 'center',
  },
  {
    field: 'CREATE_LICENSE',
    name: 'CREATE_LICENSE',
    label: 'CREATE_LICENSE',
    align: 'center',
  },
  {
    field: 'READ_REPORT',
    name: 'READ_REPORT',
    label: 'READ_REPORT',
    align: 'center',
  },
  {
    field: 'RETRIVE_FILE',
    name: 'RETRIVE_FILE',
    label: 'RETRIVE_FILE',
    align: 'center',
  },
])
const authorities = ref<Role[]>([
  {
    id: 0,
    name: 'User',
    acesses: [],
    READ_LICENSE: false,
    CREATE_LICENSE: false,
    READ_REPORT: false,
    RETRIVE_FILE: true,
  },
  {
    id: 0,
    name: 'Manager',
    acesses: [],
    READ_LICENSE: true,
    CREATE_LICENSE: true,
    READ_REPORT: false,
    RETRIVE_FILE: false,
  },
  {
    id: 0,
    name: 'Developer',
    acesses: [],
    READ_LICENSE: false,
    CREATE_LICENSE: true,
    READ_REPORT: false,
    RETRIVE_FILE: true,
  },
])

const usersData = ref<User[]>([
  {
    email: 'admin',
    name: 'admin',
    role: authorities.value[2].name,
  },
  {
    email: 'oleg@example.com',
    name: 'not oleg',
    role: authorities.value[1].name,
  },
  {
    email: 'igor@example.com',
    name: 'definetly igor',
    role: authorities.value[1].name,
  },
])
const userCoulumns = ref<Column[]>([
  { field: 'email', name: 'email', label: 'Email', align: 'left' },
  { field: 'name', name: 'name', label: 'Name', align: 'left' },
  { field: 'role', name: 'role', label: 'Role', align: 'left' },
])
const roleSelectOptions = ref(authorities.value.map((v) => v.name))

const toggleRoleAuth = (value: boolean, role: Role) => {
  console.log(role)
}

const updateUserRole = (value: string, user: User) => {
  console.log(user)
}

onBeforeMount(() => {
  const rolesPromise = getAllRoles()
  const acessesPromise = getAllAccesses()
  const usersPromice = getAllUsers()
  Promise.allSettled([rolesPromise, acessesPromise, usersPromice])
})
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
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              {{ props.value }}
            </q-td>
          </template>
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row[props.col.name]"
                @update:model-value="(v) => toggleRoleAuth(v, props.row)"
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
                v-model="props.row[props.col.name]"
                @update:model-value="(v) => updateUserRole(v, props.row)"
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
