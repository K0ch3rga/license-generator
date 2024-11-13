<script setup lang="ts">
import type { Column } from "@/shared/model"
import { getAllAccesses, readableAccess, type Access } from "@/entities/accsses"
import { type Role, deleteRole, getAllRoles, patchRole } from "@/entities/role"
import { type User, patchUser, deleteUser, getAllUsers } from "@/entities/user"
import {
  deleteSoftware,
  editSoftwareOption,
  getAllSoftwares,
  type Software,
  SoftwareList,
} from "@/entities/software"
import { getErrorByCode, showError } from "@/features/showError"
import { CreateRole } from "@/features/createRole"
import { CreateSoftwarePopup } from "@/features/createSoftware"
import { RoleAssignmentList } from "@/widgets/roleAssignmentList"
import { Header } from "@/widgets/header"
import { onBeforeMount, ref } from "vue"
import { useQuasar } from "quasar"
import { EditRole } from "@/features/editRole"
import { EditSoftware } from "@/features/editSoftware"
import { editSoftwareData } from "@/entities/software/api/crudSoftware"
import { editRoleName } from "@/entities/role/api/crudRole"

const $q = useQuasar()
const tab = ref<"users" | "roles" | "software">("users")

const roles = ref<Role[]>([])
const rolesColumns = ref<Column[]>([
  {
    field: "name",
    name: "name",
    label: "Роль",
    align: "left",
  },
  {
    field: "accesses",
    name: "accesses",
    label: "Доступы",
    align: "left",
  },
])

const usersData = ref<User[]>([])
const userCoulumns = ref<Column[]>([
  { field: "username", name: "name", label: "Email", align: "left" },
  { field: "roles", name: "roles", label: "Роли", align: "left" },
])

const authorities = ref<Access[]>([])

const softwareData = ref<Software[]>([
  {
    company_name: "oleg",
    required_attributes: [],
    license_generator_path: "/var/oleg",
    id: 0,
  },
])

const roleSelectOptions = ref<string[]>(roles.value.map((v) => v.name))
const authoritiesSelectOptions = ref<string[]>(
  authorities.value.map((a) => a.name)
)

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

// removed due to ldap registration
const handleCreateUserPopup = () => {
  return
  // $q.dialog({ component: CreateUser }).onOk((payload: Promise<User>) =>
  //   payload.then((u) => (usersData.value = usersData.value.concat(u)))
  // )
}

const handleCreateSoftwarePopup = () => {
  $q.dialog({ component: CreateSoftwarePopup }).onOk(
    (payload: Promise<Software>) =>
      payload.then((s) => (softwareData.value = softwareData.value.concat(s)))
  )
}

const handleUpdate = () => {
  const rolesPromise = getAllRoles()
  const accessesPromise = getAllAccesses()
  const usersPromise = getAllUsers()
  const softwarePromise = getAllSoftwares()

  Promise.all([rolesPromise, accessesPromise, usersPromise, softwarePromise])
    .then((r) => {
      roles.value = r[0]
      authorities.value = r[1]
      usersData.value = r[2]
      roleSelectOptions.value = roles.value.map((v) => v.name)
      authoritiesSelectOptions.value = authorities.value.map((a) => a.name)
      softwareData.value = r[3]
    })
    .catch((r) => showError(getErrorByCode(r)))
}

const handleDeleteRole = async (role: Role[]) => {
  await Promise.all(role.map((r) => deleteRole(r))).catch((e) =>
    showError(getErrorByCode(e))
  )
  handleUpdate()
}
const handleDeleteUser = async (user: User[]) => {
  await Promise.all(user.map((u) => deleteUser(u))).catch((e) =>
    showError(getErrorByCode(e))
  )
  handleUpdate()
}
const handleDeleteSoftware = async (softwares: Software[]) => {
  await Promise.all(softwares.map((s) => deleteSoftware(s))).catch((e) =>
    showError(getErrorByCode(e))
  )
  handleUpdate()
}

const handleDeleteRoleFromUser = (user: User, roleName: string) =>
  patchUser(user, roles.value.find((r) => r.name == roleName)?.id ?? -1, false)
const handleAddRoleToUser = (user: User, roleName: string) =>
  patchUser(user, roles.value.find((r) => r.name == roleName)?.id ?? -1, true)
const handleDeleteAccessFromRole = (role: Role, accessName: string) =>
  patchRole(
    role,
    authorities.value.find((a) => a.name === accessName)?.id ?? -1,
    false
  )
const handleAddAccessToRole = (role: Role, accessName: string) =>
  patchRole(
    role,
    authorities.value.find((a) => a.name === accessName)?.id ?? -1,
    true
  )
const handleDeleteOptionFromSoftware = (software: Software, option: string) =>
  editSoftwareOption(software, option, false)
const handleAddOptionToSoftware = (software: Software, option: string) =>
  editSoftwareOption(software, option, true)

const handleEditRole = (role: Role) => {
  if (!role) return
  $q.dialog({ component: EditRole, componentProps: { role: role } }).onOk(
    (payload: { role: Role; newRole: Role }) => {
      editRoleName(payload.role, payload.newRole)
        .then(handleUpdate)
        .catch((e) => showError(getErrorByCode(e)))
    }
  )
}

const handleEditSoftware = (software: Software) => {
  if (!software) return
  $q.dialog({
    component: EditSoftware,
    componentProps: { software: software },
  }).onOk((payload: { softData: Software; newSoftware: Software }) => {
    editSoftwareData(
      payload.softData,
      payload.newSoftware.company_name,
      payload.newSoftware.license_generator_path
    )
      .then(handleUpdate)
      .catch((e) => showError(getErrorByCode(e)))
  })
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
          <q-tab
            :ripple="false"
            class="menu-item text-body1"
            name="software"
            label="ПО"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" keep-alive>
          <q-tab-panel name="users">
            <RoleAssignmentList
              :can-add="false"
              :can-edit="false"
              :columns="userCoulumns"
              :rows="usersData"
              :options="roleSelectOptions"
              :option-label="(username) => username"
              @add="handleCreateUserPopup"
              @delete="handleDeleteUser"
              @remove-role="handleDeleteRoleFromUser"
              @add-role="handleAddRoleToUser"
              @edit="console.log('denied')"
            />
          </q-tab-panel>
          <q-tab-panel name="roles">
            <RoleAssignmentList
              :can-add="true"
              :can-edit="true"
              :columns="rolesColumns"
              :rows="roles"
              :options="authoritiesSelectOptions"
              :option-label="(role) => readableAccess(role)"
              @add="handleCreateRolePopup"
              @delete="handleDeleteRole"
              @remove-role="handleDeleteAccessFromRole"
              @add-role="handleAddAccessToRole"
              @edit="handleEditRole"
            />
          </q-tab-panel>
          <q-tab-panel name="software">
            <SoftwareList
              :rows="softwareData"
              @add="handleCreateSoftwarePopup"
              @delete="handleDeleteSoftware"
              @add-option="handleAddOptionToSoftware"
              @delete-option="handleDeleteOptionFromSoftware"
              @edit="handleEditSoftware"
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
