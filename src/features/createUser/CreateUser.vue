<script setup lang="ts">
import { createUser } from '@/entities/user'
import { getPublicKey } from '@/shared/api/getPublicKey'
import { encrypt } from '@/shared/model'
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { getErrorByCode, showError } from '../showError'
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const login = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

defineEmits([...useDialogPluginComponent.emits])

const handleSubmit = async () => {
  const key = (await getPublicKey()) ?? ''
  const encryptedPassword = encrypt(
    password.value,
    key
    // 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYgYmmAZqr+BPDXfYhCOYGZJFzBEjD9yqOlBSTlbFe6rw6DJoiWc/H4ibWu53ViLrj+th2vWFiS7VUIME2z/0ASjuo8JgN97z8huTjztTpemzksOX0Y4OkRDc+D+KfMW3iJATjTgTovIVuvhF0c/utuiY9aDqDuQyKVIL+APpHywIDAQAB'
  )
  if (encryptedPassword === false || !encryptedPassword) {
    showError(getErrorByCode(500))
    return
  }

  if (!email.value || !login.value || !password.value) return
  const userPromise = createUser({
    username: login.value,
    email: email.value,
    password: encryptedPassword,
  })
  onDialogOK(userPromise)
}
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat class="popup">
      <q-card-section class="text-h3"> Регистрация нового пользователя </q-card-section>
      <q-card-section class="q-py-xs">
        <label>Логин</label>
        <q-input
          dense
          outlined
          autofocus
          class="text-input"
          placeholder="Введите логин"
          v-model="login"
          :rules="[(v) => !!v]"
          no-error-icon
          hide-bottom-space
          @keyup.enter.prevent="handleSubmit"
        />
        <label>Почта</label>
        <q-input
          dense
          outlined
          class="text-input"
          placeholder="Введите email"
          v-model="email"
          :rules="[(v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)]"
          no-error-icon
          hide-bottom-space
          @keyup.enter.prevent="handleSubmit"
        />
        <label class="q-mt-xl">Пароль</label>
        <q-input
          dense
          outlined
          class="text-input"
          placeholder="Введите пароль"
          v-model="password"
          :rules="[(v) => !!v]"
          no-error-icon
          hide-bottom-space
          @keyup.enter.prevent="handleSubmit"
        />
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn
          outlined
          flat
          class="btn small btn-fill q-mt-sm"
          label="Сохранить"
          @click="handleSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped></style>
