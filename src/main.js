import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import styles
import './assets/fortyfour.css'
import './assets/players.css'
import './assets/options.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
