<script setup lang="ts">
import { getToken, useUserStore, type UserInfo } from '@/entities/user'
import { Header } from '@/widgets/header'
import { ref } from 'vue'

import { Cookies } from 'quasar'
import { decodeJwt } from 'jose'
import { useRouter } from 'vue-router'
import { getErrorByCode } from '@/features/showError'
import { getPublicKey } from '@/shared/api/getPublicKey'
import { encrypt } from '@/shared/model'

const login = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const user = useUserStore()
const routes = useRouter()

const handleLogin = async () => {
  const key = (await getPublicKey()) ?? ''
  console.log(key)
  const encryptedPassword = encrypt(
    password.value,
    key
    // 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYgYmmAZqr+BPDXfYhCOYGZJFzBEjD9yqOlBSTlbFe6rw6DJoiWc/H4ibWu53ViLrj+th2vWFiS7VUIME2z/0ASjuo8JgN97z8huTjztTpemzksOX0Y4OkRDc+D+KfMW3iJATjTgTovIVuvhF0c/utuiY9aDqDuQyKVIL+APpHywIDAQAB'
  )
  if (encryptedPassword === false || !encryptedPassword) {
    error.value = getErrorByCode(500)
    return
  }

  loading.value = true
  getToken(login.value, encryptedPassword)
    .then((t) => {
      const userInfo = decodeJwt<UserInfo>(t.access_token)
      if (!userInfo) Promise.reject(500)

      const time = new Date().getTime() + 7200000 // 2h
      Cookies.set('session', t.access_token, {
        expires: new Date(time).toUTCString(),
      })
      user.setUserFromJWT(userInfo)
      console.log(decodeJwt<UserInfo>(t.access_token))
      routes.replace({ name: 'main' })
    })
    .catch((e) => (error.value = getErrorByCode(e)))
    .finally(() => (loading.value = false))
}

const closeError = () => {
  error.value = ''
}
</script>
<template>
  <Header />
  <q-page-container>
    <q-page class="fit flex flex-center column">
      <div class="flex column">
        <q-chip
          outline
          :label="error"
          class="q-my-md error-label self-stretch error"
          :class="{ 'hidden-chip': !error }"
          :ripple="false"
          icon="svguse:src/shared/assets/block.svg#block"
          removable
          icon-remove="sym_s_close"
          @remove="closeError"
        />
        <q-input
          v-model="login"
          autofocus
          outlined
          placeholder="Логин"
          class="text-input"
          :error="!!error"
          :rules="[(val) => !!val || 'Поле обязательно']"
          lazy-rules
          no-error-icon
          @keydown.enter.prevent="handleLogin"
        />
        <q-input
          v-model="password"
          type="password"
          placeholder="Пароль"
          outlined
          dense
          class="text-input"
          :error="!!error"
          :rules="[(val) => !!val || 'Поле обязательно']"
          lazy-rules
          no-error-icon
          @keydown.enter.prevent="handleLogin"
        />
        <div class="flex justify-between items-center">
          <div>
            <q-spinner v-show="loading" />
          </div>
          <q-btn
            unelevated
            outline
            class="self-end btn btn-fill small"
            @click="handleLogin"
            label="Войти"
          />
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>
<style scoped lang="sass">
:deep(.q-field__append)
  display: none

.hidden-chip
  visibility: hidden
</style>
