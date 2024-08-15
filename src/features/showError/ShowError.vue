<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
const props = defineProps<{ error: string }>()
defineEmits({ ...useDialogPluginComponent.emits })
const { dialogRef, onDialogHide } = useDialogPluginComponent()
</script>
<template>
  <q-dialog
    seamless
    no-focus
    position="bottom"
    ref="dialogRef"
    transition-duration="300"
  >
    <q-card flat class="q-ma-md flex text-body2 error">
      <q-card-section>
        <q-icon
          class="q-mr-xs"
          name="svguse:src/shared/assets/block.svg#block |0 0 100 100"
        />{{ props.error }}</q-card-section
      >
      <q-card-actions>
        <q-btn
          flat
          icon="sym_s_close"
          class="btn btn-link"
          @click="onDialogHide"
      /></q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped></style>
