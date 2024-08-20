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

const $q = useQuasar()
const tab = ref<'users' | 'roles'>('users')

const roles = ref<Role[]>([])
const rolesColumns = ref<Column[]>([
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

const usersData = ref<User[]>([])
const userCoulumns = ref<Column[]>([
  { field: 'username', name: 'name', label: 'Email', align: 'left' },
  { field: 'roles', name: 'roles', label: 'Роли', align: 'left' },
])

const roleSelectOptions = ref<string[]>(roles.value.map((v) => v.name))
const authoritiesSelectOptions = ref<string[]>([])

const handleCreateRolePopup = () => {
  $q.dialog({
    component: CreateRole,
  }).onOk((payload: Promise<Role>) => {
    payload.then((r) => {
      roles.value = roles.value.concat(r)
      roleSelectOptions.value = roles.value.map((v) => v.name)
    })
  })
}

const handleCreateUserPopup = () => {
  $q.dialog({ component: CreateUser }).onOk((payload: Promise<User>) =>
    payload.then((u) => (usersData.value = usersData.value.concat(u)))
  )
}

const handleUpdate = () => {
  const rolesPromise = getAllRoles()
  const acessesPromise = getAllAccesses()
  const usersPromise = getAllUsers()
  Promise.all([rolesPromise, acessesPromise, usersPromise])
    .then((r) => {
      roles.value = r[0]
      authoritiesSelectOptions.value = r[1].map((v) => v.name)
      usersData.value = r[2]
    })
    .catch((r) => showError(ErrorDescription(r) ?? 'Сервер не доступен'))
  roleSelectOptions.value = roles.value.map((v) => v.name)
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
      <q-card flat class="padded q-mx-md q-mb-md card">
        <q-tabs align="left" narrow-indicator dense v-model="tab">
          <q-tab
            :ripple="false"
            class="menu-item text-body1"
            name="users"
            label="Пользователи"
          />
          <q-tab
            :ripple="false"
            class="menu-item text-body1"
            name="roles"
            label="Роли"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" keep-alive>
          <q-tab-panel name="users">
            <RoleAssignmentList
              :columns="userCoulumns"
              :rows="usersData"
              :options="roleSelectOptions"
              @-add="handleCreateUserPopup"
              @-update="handleUpdate"
              @delete="handleDeleteUser"
            />
          </q-tab-panel>
          <q-tab-panel name="roles">
            <RoleAssignmentList
              :columns="rolesColumns"
              :rows="roles"
              :options="authoritiesSelectOptions"
              @-add="handleCreateRolePopup"
              @-update="handleUpdate"
              @delete="handleDeleteRole"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page>
  </q-page-container>
</template>
<style scoped lang="sass">
.menu-item
  border-radius: 8px
  &.active
    color: var(--blue1)
</style>
