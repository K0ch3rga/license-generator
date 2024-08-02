<script setup lang="ts">
import { Header } from '@/widgets/header'
</script>
<template>
  <Header />
  <q-page-container>
    <q-page class="flex flex-center fit column">
      <q-card flat>
        <q-card-section class="flex justify-evenly q-pa-xs overlay">
          <div class="not-found">404</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h2 q-my-md">Страница не найдена</div>
          <q-btn
            flat
            class="btn btn-fill medium text-button"
            :ripple="false"
            to="/"
            label="Вернуться на главную"
          />
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>
<style scoped lang="sass">
.max-height
  height: calc(100svh - 98px)

.overlay
  margin-bottom: -20px

.not-found
  font-size: 120px
  font-weight: 900
  line-height: 1em
  color: transparent
  background: linear-gradient(180deg, rgba(23,101,193,1) 0%, rgba(244,252,255,1) 100%)
  background-clip: text
</style>
