import './assets/main.css'
import DataProvider from './util/data-provider'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Setting up Data Provider
DataProvider
  .getInstance()
  .setUrl(import.meta.env.VITE_BACKEND_URL)

app.use(createPinia())
app.use(router)

app.mount('#app')
