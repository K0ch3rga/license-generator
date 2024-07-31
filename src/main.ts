import './shared/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Cookies, Quasar } from 'quasar'
import { App } from './app'
import quasarIconSet from 'quasar/icon-set/material-symbols-sharp'

// Import icon libraries
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import { router } from './app/router'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(Quasar, {
  config: {
    dark: 'auto',
  },
  plugins: {
    Cookies,
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
})

app.mount('#app')
