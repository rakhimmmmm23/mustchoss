import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css';
import { createHead, VueHeadMixin } from '@vueuse/head'
import { createVuetify } from 'vuetify/lib/framework.mjs'

const vuetify = createVuetify({
    ssr: false,
  })

const head = createHead()

createApp(App)
.use(store)
.use(router)
.use(vuetify)
.mixin(VueHeadMixin)
.use(head)
.mount('#app')