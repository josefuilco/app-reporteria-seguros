import './assets/main.css'
import Api from './core/util/api'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Setting up Data Provider
Api
  .getInstance()
  .setUrl(import.meta.env.VITE_BACKEND_URL)

app.use(createPinia())
app.use(router)

app.mount('#app')
