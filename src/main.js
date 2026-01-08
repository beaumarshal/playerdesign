import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Import styles
import './assets/fortyfour.css'
import './assets/players.css'
import './assets/options.css'
import './assets/docs.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
