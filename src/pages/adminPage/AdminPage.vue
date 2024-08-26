<script setup lang="ts">
import type { Column } from '@/shared/model'
import { getAllAccesses, readableAccess, type Access } from '@/entities/accsses'
import { type Role, deleteRole, getAllRoles, patchRole } from '@/entities/role'
import { type User, patchUser, deleteUser, getAllUsers } from '@/entities/user'
import { getErrorByCode, showError } from '@/features/showError'
import { CreateRole } from '@/features/createRole'
import { CreateUser } from '@/features/createUser'
import { RoleAssignmentList } from '@/widgets/roleAssignmentList'
import { Header } from '@/widgets/header'
import { onBeforeMount, ref } from 'vue'
import { useQuasar } from 'quasar'

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
  const accessesPromise = getAllAccesses()
  const usersPromise = getAllUsers()

  Promise.all([rolesPromise, accessesPromise, usersPromise])
    .then((r) => {
      roles.value = r[0]
      authoritiesSelectOptions.value = r[1].map((v: Access) => v.name)
      usersData.value = r[2]
      roleSelectOptions.value = roles.value.map((v) => v.name)
    })
    .catch((r) => showError(getErrorByCode(r)))
}

const handleDeleteRole = async (role: Role[]) => {
  await Promise.all(role.map((r) => deleteRole(r))).catch((e) => showError(getErrorByCode(e)))
  handleUpdate()
}
const handleDeleteUser = async (user: User[]) => {
  await Promise.all(user.map((u) => deleteUser(u))).catch((e) => showError(getErrorByCode(e)))
  handleUpdate()
}

const handleDeleteRoleFromUser = (user: User, roleName: string) =>
  patchUser(user, roles.value.find((r) => r.name == roleName)?.id ?? -1, false)
const handleAddRoleToUser = (user: User, roleName: string) =>
  patchUser(user, roles.value.find((r) => r.name == roleName)?.id ?? -1, true)
const handleDeleteAccessFromRole = (role: Role, accessName: string) =>
  patchRole(role, authoritiesSelectOptions.value.indexOf(accessName), false)
const handleAddAccessToRole = (role: Role, accessName: string) =>
  patchRole(role, authoritiesSelectOptions.value.indexOf(accessName), true)

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
          <q-tab :ripple="false" class="menu-item text-body1" name="users" label="Пользователи" />
          <q-tab :ripple="false" class="menu-item text-body1" name="roles" label="Роли" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" keep-alive>
          <q-tab-panel name="users">
            <RoleAssignmentList
              :columns="userCoulumns"
              :rows="usersData"
              :options="roleSelectOptions"
              :option-label="(username) => username"
              @-add="handleCreateUserPopup"
              @delete="handleDeleteUser"
              @remove-role="handleDeleteRoleFromUser"
              @add-role="handleAddRoleToUser"
            />
          </q-tab-panel>
          <q-tab-panel name="roles">
            <RoleAssignmentList
              :columns="rolesColumns"
              :rows="roles"
              :options="authoritiesSelectOptions"
              :option-label="(role) => readableAccess(role)"
              @-add="handleCreateRolePopup"
              @delete="handleDeleteRole"
              @remove-role="handleDeleteAccessFromRole"
              @add-role="handleAddAccessToRole"
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
