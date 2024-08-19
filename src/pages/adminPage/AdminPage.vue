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
import { useQuasar } from 'quasar'
import { CreateRole } from '@/features/createRole'
import { CreateUser } from '@/features/createUser'
import { RoleAssignmentList } from '@/widgets/roleAssignmentList'
import { ErrorDescription } from './model/errorCodes'

const table = ref<'users' | 'roles'>('users')
const $q = useQuasar()

const authoritiesColumns = ref<Column[]>([
  {
    field: 'name',
    name: 'name',
    label: 'Роль',
    align: 'left',
  },
  {
    field: 'accesses',
    name: 'accesses',
    label: 'Доступы',
    align: 'left',
  },
])
const authorities = ref<Role[]>([
  {
    id: 0,
    name: 'User',
    acesses: ['READ_LICENSE'],
  },
  {
    id: 1,
    name: 'Manager',
    acesses: [],
  },
  {
    id: 2,
    name: 'Developer',
    acesses: ['READ_LICENSE', 'CREATE_LICENSE', 'READ_REPORT'],
  },
])

const usersData = ref<User[]>([
  {
    id: 0,
    username: 'admin',
    roles: [authorities.value[2].name],
  },
  {
    id: 1,
    username: 'oleg@example.com',
    roles: [authorities.value[1].name],
  },
  {
    id: 2,
    username: 'igor@example.com',
    roles: [authorities.value[1].name, authorities.value[0].name],
  },
])
const userCoulumns = ref<Column[]>([
  { field: 'username', name: 'name', label: 'Email', align: 'left' },
  { field: 'roles', name: 'roles', label: 'Роли', align: 'left' },
])

const roleSelectOptions = authorities.value.map((v) => v.name)
const authoritiesSelectOptions = [
  'READ_LICENSE',
  'CREATE_LICENSE',
  'READ_REPORT',
  'RETRIVE_FILE',
]

const handleCreateRolePopup = () => {
  $q.dialog({
    component: CreateRole,
  }).onOk((payload) => console.log(payload))
}

const handleCreateUserPopup = () => {
  $q.dialog({ component: CreateUser }).onOk((payload) => console.log(payload))
}

const handleUpdate = () => {
  const rolesPromise = getAllRoles()
  const acessesPromise = getAllAccesses()
  const usersPromise = getAllUsers()
  Promise.all([rolesPromise, acessesPromise, usersPromise])
    .then((r) => {
      console.log(r[0])
      console.log(r[1])
      console.log(r[2])
    })
    .catch((r) => showError(ErrorDescription(r) ?? 'Сервер не доступен'))
}

const handleDeleteRole = (role: Role[]) => {
  console.log(role)
}
const handleDeleteUser = (user: User[]) => {
  console.log(user)
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
        <RoleAssignmentList
          v-if="table == 'users'"
          :columns="userCoulumns"
          :rows="usersData"
          :options="roleSelectOptions"
          @-add="handleCreateUserPopup"
          @-update="handleUpdate"
          @-delete="handleDeleteUser"
        />
        <RoleAssignmentList
          v-if="table == 'roles'"
          :columns="authoritiesColumns"
          :rows="authorities"
          :options="authoritiesSelectOptions"
          @-add="handleCreateRolePopup"
          @-update="handleUpdate"
          @-delete="handleDeleteRole"
        />
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
