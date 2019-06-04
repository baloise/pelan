import '@babel/polyfill'
import '@/registerServiceWorker'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import Notifications from 'vue-notification'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './i18n'

Vue.use(Notifications)

Vue.use(Vuetify, {
    lang: {
        t: (key, ...params) => i18n.t(key, params)
    },
    theme: {
        primary: '#008AC9',
        secondary: '#F4F9FC',
        accent: '#003399',
        success: '#2DB200',
        error: '#FF3366',
        info: '#008AC9',
        warning: '#FF9900',
        black: '#444444'
    }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true
})

new Vue({
    router,
    store,
    i18n,
    render: function (h) { return h(App) }
}).$mount('#app')
