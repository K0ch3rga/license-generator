<script setup lang="ts">
import { ListLicenses } from '@/widgets/listLicenses'
import { Header } from '@/widgets/header'
import { ref } from 'vue'
const rerender = ref<number>(0)
const updateList = () => {
  rerender.value = rerender.value + 1
}
</script>
<template>
  <Header @license-generated="updateList" />
  <q-page-container>
    <q-page class="fit flex column">
      <ListLicenses :key="rerender" />
    </q-page>
  </q-page-container>
</template>
<style scoped></style>
