<script setup lang="ts">
import { createSoftware } from '@/entities/software'
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const company_name = ref<string>('')
const license_generator_path = ref<string>('')

defineEmits([...useDialogPluginComponent.emits])

const handleSubmit = async () => {
  const softwarePromise = createSoftware({
    company_name: company_name.value,
    required_attributes: [],
    license_generator_path: license_generator_path.value,
  })
  onDialogOK(softwarePromise)
}
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat class="popup">
      <q-card-section class="text-h3"> Регистрация нового пользователя </q-card-section>
      <q-card-section class="q-py-xs">
        <label>Название компании</label>
        <q-input
          dense
          outlined
          autofocus
          class="text-input"
          placeholder="Введите название компании"
          v-model="company_name"
          :rules="[(v) => !!v]"
          no-error-icon
          hide-bottom-space
          @keyup.enter.prevent="handleSubmit"
        />
        <label class="q-mt-xl">Путь до генератора</label>
        <q-input
          dense
          outlined
          class="text-input"
          placeholder="Введите путь до генератора"
          v-model="license_generator_path"
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
