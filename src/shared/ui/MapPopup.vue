<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
const props = defineProps<{ map: Map<string, string> }>()
const tempMap = ref<Map<string, string>>(new Map<string, string>(props.map))
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()
const newSlots = ref<Array<[string, string]>>([['', '']])

const addEmptuyValues = () => (newSlots.value = newSlots.value.concat([['', '']]))
const removeValue = (index: number) => newSlots.value.splice(index, 1)
const removeValueFromMap = (key: string) => tempMap.value.delete(key)

const onSubmit = () => {
  newSlots.value.forEach((v) => (v[0] && v[1] ? tempMap.value.set(v[0], v[1]) : undefined))
  onDialogOK(tempMap.value)
}
</script>
<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section class="text-h3">Дополнительные значения</q-card-section>
      <q-card-section>
        <div
          v-for="d in tempMap.entries()"
          :key="d[0] + d[1]"
          class="flex flex-row justify-around q-my-xs"
        >
          <q-input outlined class="text-input col-grow q-mx-xs" placeholder="Ключ" v-model="d[0]" />
          <q-input
            outlined
            class="text-input col-grow q-mx-xs"
            placeholder="Значение"
            v-model="d[1]"
          />
          <q-btn flat class="btn btn-link" icon="sym_s_remove" @click="removeValueFromMap(d[0])" />
        </div>
        <div v-for="(d, i) in newSlots" :key="i" class="flex flex-row justify-around q-my-xs">
          <q-input outlined class="text-input col-grow q-mx-xs" placeholder="Ключ" v-model="d[0]" />
          <q-input
            outlined
            class="text-input col-grow q-mx-xs"
            placeholder="Значение"
            v-model="d[1]"
          />
          <q-btn
            flat
            icon="sym_s_add"
            class="btn btn-link"
            @click="addEmptuyValues"
            v-if="newSlots.length - 1 == i"
          />
          <q-btn flat icon="sym_s_remove" class="btn btn-link" v-else @click="removeValue(i)" />
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn class="btn btn-fill medium q-mr-xs" label="Отменить" @click="onDialogHide" />
        <q-btn class="btn btn-fill medium q-ml-xs" label="Сохранить" @click="onSubmit" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped></style>
