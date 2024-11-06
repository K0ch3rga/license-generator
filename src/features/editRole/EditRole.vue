<script setup lang="ts">
import type { Role } from "@/entities/role"
import { useDialogPluginComponent } from "quasar"
import { ref } from "vue"

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
const props = defineProps<{ role: Role }>()
defineEmits([...useDialogPluginComponent.emits])
const mutatedName = ref<string>(props.role.name)
const handleSubmit = () => onDialogOK({ ...props.role, name: mutatedName })
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogCancel">
    <q-card flat class="popup">
      <q-card-section class="text-h3"> Изменение роли </q-card-section>
      <q-card-section class="q-py-xs">
        <q-input
          dense
          outlined
          autofocus
          class="text-input"
          placeholder="Введите название"
          no-error-icon
          hide-bottom-space
          v-model="mutatedName"
          :rules="[(v) => !!v]"
          lazy-rules
          @keyup.enter.prevent="handleSubmit"
        />
      </q-card-section>
      <q-card-section class="g-10 flex row justify-between no-wrap">
        <q-btn
          flat
          :ripple="false"
          class="btn btn-stroke text-button small"
          label="Отмена"
          type="reset"
          @click="onDialogCancel"
        />
        <q-btn
          flat
          :ripple="false"
          class="btn btn-fill text-button small"
          label="Подтвердить"
          type="submit"
          @click="handleSubmit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="sass" scoped></style>
