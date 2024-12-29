import * as Vue from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'

const app = Vue.createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


export default {
    setup() {
        const $cookies = Vue.inject('$cookies');

        $cookies.config('1h', '', '', true);
        $cookies.set(isLoggedIn, false, );
        $cookies.set(isAdmin, false);
    }
}