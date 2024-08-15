<script setup lang="ts">
import { getAllAccesses } from '@/entities/accsses'
import type { Role } from '@/entities/role'
import { getAllRoles } from '@/entities/role'
import { getAllUsers } from '@/entities/user'
import type { User } from '@/entities/user/User'
import { Header } from '@/widgets/header'
import type { Column } from '@/shared/model'
import { onBeforeMount, ref } from 'vue'
import { showError } from '@/features/showError'
import type { SelectableRole, SelectableUser } from './model/'
import { useQuasar } from 'quasar'
import { CreateRole } from '@/features/createRole'
import { CreateUser } from '@/features/createUser'

const table = ref<string>('users')
const $q = useQuasar()

const authoritiesColumns = ref<Column[]>([
  {
    field: 'selected',
    name: 'selected',
    label: '',
  },
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
const authorities = ref<SelectableRole[]>(
  [
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
  ].map((r) => ({ selected: false, ...r }))
)

const usersData = ref<SelectableUser[]>(
  [
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
  ].map((u) => ({ selected: false, ...u }) as unknown as SelectableUser)
)
const userCoulumns = ref<Column[]>([
  { field: 'selected', name: 'selected', label: '' },
  { field: 'email', name: 'email', label: 'Email', align: 'left' },
  { field: 'name', name: 'name', label: 'Name', align: 'left' },
  { field: 'role', name: 'role', label: 'Role', align: 'left' },
])
const roleSelectOptions = ref(authorities.value.map((v) => v.name))

const handleCreateRolePopup = () => {
  $q.dialog({
    component: CreateRole,
  }).onOk((payload) => console.log(payload))
}

const handleCreateUserPopup = () => {
  $q.dialog({ component: CreateUser }).onOk((payload) => console.log(payload))
}

const toggleRoleAuth = (value: boolean, role: Role) => {
  console.log(role)
}

const updateUserRole = (value: string, user: User) => {
  console.log(user)
}

const handleUpdate = () => {
  const rolesPromise = getAllRoles()
  const acessesPromise = getAllAccesses()
  const usersPromise = getAllUsers()
  Promise.allSettled([rolesPromise, acessesPromise, usersPromise])
    .then((t: PromiseSettledResult<any>[]) =>
      t.find((p) => p.status == 'rejected') ? Promise.reject(t[0]) : t
    )
    .catch(() => showError('something wrong'))
}

onBeforeMount(() => {
  handleUpdate()
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
              @click="handleCreateRolePopup"
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
              @click="handleUpdate"
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
              @click="handleCreateUserPopup"
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
              @click="handleUpdate"
            />
          </template>
          <template v-slot:body-cell-selected="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row[props.col.name]"
                @update:model-value="(v) => toggleRoleAuth(v, props.row)"
                class="checkbox"
                size="32px"
              />
            </q-td>
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
