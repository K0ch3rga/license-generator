<script setup lang="ts">
import { createRole } from '@/entities/role'
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const name = ref<string>('')

defineEmits([...useDialogPluginComponent.emits])

const handleSubmit = () => {
  if (!name.value) return
  const rolePromise = createRole({ name: name.value })
  onDialogOK(rolePromise)
}
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat class="popup">
      <q-card-section class="text-h3">Создание новой роли</q-card-section>
      <q-card-section class="q-py-xs">
        <label>Название роли</label>
        <q-input
          dense
          outlined
          autofocus
          class="text-input"
          placeholder="Введите название"
          v-model="name"
          lazy-rules
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
