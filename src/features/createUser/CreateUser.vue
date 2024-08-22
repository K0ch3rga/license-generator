<script setup lang="ts">
import { createUser } from '@/entities/user'
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const email = ref<string>('')

defineEmits([...useDialogPluginComponent.emits])

const handleSubmit = () => {
  if (!email.value) return
  const userPromise = createUser({ username: email.value })
  onDialogOK(userPromise)
}
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat class="popup q-pa-md">
      <label>Почта</label>
      <q-input
        dense
        outlined
        autofocus
        class="text-input"
        placeholder="Введите email"
        v-model="email"
        lazy-rules
        :rules="[(v) => !!v]"
        no-error-icon
        hide-bottom-space
        @keyup.enter.prevent="handleSubmit"
      />
      <div class="flex justify-end">
        <q-btn
          outlined
          flat
          class="btn small btn-fill q-mt-sm"
          label="Сохранить"
          @click="handleSubmit"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<style scoped></style>
