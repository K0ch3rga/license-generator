<script setup lang="ts">
import type { Software } from "@/entities/software"
import { useDialogPluginComponent } from "quasar"
import { ref } from "vue"

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
const props = defineProps<{ software: Software }>()
defineEmits([...useDialogPluginComponent.emits])
const mutatedSoftware = ref<Software>(Object.assign({}, props.software))
const handleSubmit = () =>
  onDialogOK({
    softData: props.software,
    newSoftware: mutatedSoftware.value,
  })
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogCancel">
    <q-card flat class="popup">
      <q-card-section class="text-h3">
        Изменение программного обеспечения
      </q-card-section>
      <q-card-section class="q-py-xs">
        <label>Название компании</label>
        <q-input
          dense
          outlined
          autofocus
          class="text-input"
          placeholder="Введите название компании"
          no-error-icon
          hide-bottom-space
          v-model="mutatedSoftware.company_name"
          :rules="[(v) => !!v]"
          lazy-rules
          @keyup.enter.prevent="handleSubmit"
        />
        <label>Путь до генератора</label>
        <q-input
          dense
          outlined
          autofocus
          class="text-input"
          placeholder="Введите путь"
          no-error-icon
          hide-bottom-space
          v-model="mutatedSoftware.license_generator_path"
          :rules="[(v) => !!v]"
          lazy-rules
          @keyup.enter.prevent="handleSubmit"
        />
      </q-card-section>
      <q-card-section class="g-10 flex row justify-between no-wrap">
        <q-btn
          flat
          :ripple="false"
          class="btn btn-stroke text-button small f-even"
          label="Отмена"
          type="reset"
          @click="onDialogCancel"
        />
        <q-btn
          flat
          :ripple="false"
          class="btn btn-fill text-button small f-even"
          label="Подтвердить"
          type="submit"
          @click="handleSubmit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="sass" scoped></style>
