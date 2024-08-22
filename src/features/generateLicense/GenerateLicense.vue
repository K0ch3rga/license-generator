<script setup lang="ts">
import { generateLicense, type NewLicenseDto } from '@/entities/license'
import { exportFile, date, type QFile } from 'quasar'
import { ref, type Ref } from 'vue'
import { getErrorByCode, showError } from '../showError'
const popupVisible = ref<boolean>(false)
const loading = ref<boolean>(false)
const file = ref<File>()
const product = ref<string>()
const company = ref<string>()
const expirationDate = ref<string>(
  date.formatDate(date.addToDate(new Date(), { months: 1 }), 'D.M.YYYY')
)
const userCount = ref<number>(1)
const fileUploader = ref() as Ref<QFile>

const emits = defineEmits<{ AddLicense: [] }>()

const handlePopupToggle = () => {
  popupVisible.value = !popupVisible.value
}

const handleSubmit = async () => {
  if (!file.value) return
  loading.value = true
  generateLicense(file.value, {
    company_name: company.value,
    product_name: product.value,
    license_users_count: userCount.value,
    exp_time: date.formatDate(date.extractDate(expirationDate.value, 'D.M.YYYY'), 'DD-MM-YYYY'),
  } as NewLicenseDto)
    .then((downloadedFile) => {
      emits('AddLicense')
      exportFile(downloadedFile.filename ?? 'license file.txt', downloadedFile.blob)
    })
    .catch((e) => showError(getErrorByCode(e)))

  popupVisible.value = false
  file.value = undefined
  product.value = ''
  company.value = ''
  userCount.value = 1
  expirationDate.value = date.formatDate(date.addToDate(new Date(), { months: 1 }), 'D.M.YYYY')
}

const ruLocale = {
  days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
  daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
    '_'
  ),
  monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
}

const uploadFile = () => {
  // document.getElementById('fileUpload')?.click()
  fileUploader.value.pickFiles()
}
</script>
<template>
  <q-dialog v-model="popupVisible">
    <q-card flat class="popup q-pa-sm" v-show="popupVisible">
      <label>Название компании</label>
      <q-input
        outlined
        class="text-input q-mb-sm"
        placeholder="Введите название компании"
        v-model="company"
        no-error-icon
        hide-bottom-space
        :rules="[(v: string) => !!v]"
      />
      <label>Название продукта</label>
      <q-input
        outlined
        class="text-input q-mb-sm"
        placeholder="Введите название продукта"
        v-model="product"
        no-error-icon
        hide-bottom-space
        :rules="[(v: string) => !!v]"
      />
      <label>Количество пользователей</label>
      <q-input
        outlined
        class="text-input q-mb-sm"
        placeholder="Введите количество пользователей"
        v-model="userCount"
        no-error-icon
        hide-bottom-space
        :rules="[(v: string) => !!v, (v: string | number) => !isNaN(v as number)]"
      />
      <label>Дата окончания</label>
      <q-input
        v-model="expirationDate"
        :rules="[
          (v: string) => /^[0-3]?\d\.[0-1]?\d\.[\d]+$/.test(v),
          (v: string) => date.extractDate(v, 'D.M.YYYY').getTime() > new Date().getTime(),
        ]"
        placeholder="Введите дату окончания"
        outlined
        class="text-input q-mb-sm"
        hide-bottom-space
        no-error-icon
      >
        <template v-slot:append>
          <q-icon size="14px" name="img:src/shared/assets/calendar.svg" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                v-model="expirationDate"
                mask="D.M.YYYY"
                minimal
                first-day-of-week="1"
                class="date-input"
                :locale="ruLocale"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" class="btn btn-fill" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <label>Файл</label>
      <q-file
        for="fileUpload"
        outlined
        dense
        class="q-mb-sm file-upload"
        v-model="file"
        ref="fileUploader"
      >
        <template v-slot:after>
          <q-btn
            flat
            :ripple="false"
            label="Выбрать файл"
            class="btn btn-stroke small"
            @click="uploadFile"
          />
        </template>
      </q-file>
      <q-btn
        flat
        :ripple="false"
        class="btn btn-stroke text-button medium"
        label="Подтвердить"
        @click="handleSubmit"
      />
    </q-card>
  </q-dialog>
  <q-btn
    flat
    :ripple="false"
    icon="sym_s_add"
    class="fixed btn btn-fill text-button small"
    @click="handlePopupToggle"
    label="Создать лицензию"
  />
</template>
<style scoped lang="sass">
.q-btn
  position: relative
  bottom: 0

.q-card.q-pa-sm
  padding: 12px

.q-input
  background: var(--background)
  :deep(i.text-negative)
    display: none
</style>
