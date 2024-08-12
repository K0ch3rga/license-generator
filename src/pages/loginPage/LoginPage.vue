<script setup lang="ts">
import { getToken, useUserStore } from '@/entities/user'
import { Header } from '@/widgets/header'
import { ref } from 'vue'
import { getDescriptionByCode } from './loginErrorCodes'
import { Cookies } from 'quasar'
import { decodeJwt } from 'jose'
import type { UserInfo } from '@/entities/user'
import { useRouter } from 'vue-router'

const login = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const user = useUserStore()
const routes = useRouter()

const handleLogin = async () => {
  loading.value = true
  getToken(login.value, password.value)
    .then((t) => {
      const time = new Date().getTime() + 7200000 // 2h
      Cookies.set('session', t.access_token, {
        expires: new Date(time).toUTCString(),
      })
      user.setUser(decodeJwt<UserInfo>(t.access_token).username)
      console.log(decodeJwt<UserInfo>(t.access_token))
      routes.replace({ name: 'main' })
    })
    .catch((e) => (error.value = getDescriptionByCode(e)))
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
          class="q-my-md error-label self-stretch"
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
