import { Dialog } from 'quasar'
import ShowError from './ShowError.vue'

export const showError = (error: string) => {
  const dialog = Dialog.create({
    component: ShowError,
    componentProps: {
      error: error,
    },
    transitionHide: 'slide-down',
  })

  setTimeout(() => dialog.hide(), 5 * 1000)
}

export const getErrorByCode = (code: number): string =>
  errorCodes.get(code) ?? 'Сервер не отвечает'

const errorCodes = new Map<number, string>()
errorCodes.set(401, 'Вы не авторизованы')
errorCodes.set(402, 'Требуется оплата')
errorCodes.set(403, 'Недостаточно прав')
errorCodes.set(500, 'Ошибка сервера')
