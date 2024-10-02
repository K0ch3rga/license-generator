<script setup lang="ts">
import { getToken, useUserStore, type UserInfo } from '@/entities/user'
import { Header } from '@/widgets/header'
import { ref } from 'vue'

import { Cookies } from 'quasar'
import { decodeJwt } from 'jose'
import { useRouter } from 'vue-router'
import { getErrorByCode, showError } from '@/features/showError'
import { getPublicKey } from '@/shared/api/getPublicKey'
import { encrypt } from '@/shared/model'

const login = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const user = useUserStore()
const routes = useRouter()

const handleLogin = async () => {
  loading.value = true
  const key = (await getPublicKey()) ?? ''
  const encryptedPassword = encrypt(password.value, key)
  if (encryptedPassword === false || !encryptedPassword) {
    error.value = getErrorByCode(500)
    loading.value = false
    return
  }

  getToken(login.value, encryptedPassword)
    .then((t) => {
      const userInfo = decodeJwt<UserInfo>(t.access_token)
      if (!userInfo) Promise.reject(500)

      const time = new Date().getTime() + 7200000 // 2h
      Cookies.set('session', t.access_token, {
        expires: new Date(time).toUTCString(),
      })
      user.setUserFromJWT(userInfo)
      routes.replace({ name: 'main' })
    })
    .catch((e) => showError(getErrorByCode(e)))
    .finally(() => (loading.value = false))
}
</script>
<template>
  <Header />
  <q-page-container>
    <q-page class="fit flex flex-center column">
      <q-card flat class="flex column card">
        <q-card-section class="text-h3">Вход в систему</q-card-section>
        <q-card-section>
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
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>
<style scoped lang="sass">
:deep(.q-field__append)
  display: none

.hidden-chip
  visibility: hidden
</style>
