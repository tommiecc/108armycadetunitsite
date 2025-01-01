import * as Vue from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'




const app = Vue.createApp(App)

app.use(createPinia())
app.use(router).use(VueCookies, {expires: '1h', secure: true});

app.mount('#app')