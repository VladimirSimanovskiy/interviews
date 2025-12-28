import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/app/App.vue'
import { router } from '@/app/providers/router'
import { setupPrimeVue } from '@/app/providers/primevue'
import { initFirebase } from '@/shared/api/firebase'

import {
  AppButton,
  AppMenubar,
  AppInputText,
  AppProgressSpinner,
  AppToast,
  AppCard,
  AppDataTable,
  AppColumn,
  AppBadge,
  AppConfirmDialog,
  AppMessage,
} from '@/shared/ui'

initFirebase()

const app = createApp(App)

app.use(createPinia())
app.use(router)
setupPrimeVue(app)
app.component('AppMenubar', AppMenubar)
app.component('AppButton', AppButton)
app.component('AppInputText', AppInputText)
app.component('AppToast', AppToast)
app.component('AppProgressSpinner', AppProgressSpinner)
app.component('AppCard', AppCard)
app.component('AppDataTable', AppDataTable)
app.component('AppColumn', AppColumn)
app.component('AppBadge', AppBadge)
app.component('AppConfirmDialog', AppConfirmDialog)
app.component('AppMessage', AppMessage)

export default app
