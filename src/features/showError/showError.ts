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
