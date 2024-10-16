<script setup lang="ts">
import { createSoftware } from '@/entities/software'
import { QInput, useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const company_name = ref<string>('')
const companyNameRef = ref<QInput>()
const license_generator_path = ref<string>('')
const licenseGeneratorPath = ref<QInput>()

defineEmits([...useDialogPluginComponent.emits])

const handleSubmit = async () => {
  if (!companyNameRef.value?.validate() || !licenseGeneratorPath.value?.validate()) {
    return
  }
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
      <q-card-section class="text-h3"> Добавление нового программного обеспечения </q-card-section>
      <form @submit.prevent.stop="handleSubmit">
        <q-card-section class="q-py-xs">
          <label>Название ПО</label>
          <q-input
            dense
            outlined
            autofocus
            class="text-input"
            placeholder="Введите название программного обеспечения"
            v-model="company_name"
            :rules="[(v) => !!v]"
            no-error-icon
            hide-bottom-space
            ref="companyNameRef"
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
            ref="licenseGeneratorPath"
          />
        </q-card-section>
        <q-card-actions class="flex justify-end">
          <q-btn outlined flat class="btn small btn-fill q-mt-sm" label="Сохранить" type="submit" />
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>
<style scoped></style>
