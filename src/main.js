import '@babel/polyfill'
import '@/registerServiceWorker'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import axios from 'axios'

Vue.use(Notifications)
Vue.use(Vuetify, {
    theme: {
        primary: '#008AC9',
        secondary: '#EFF9FE',
        accent: '#003399',
        success: '#2DB200',
        error: '#FF3366',
        info: '#008AC9',
        warning: '#FF9900'
    },
    lang: {
        t: (key, ...params) => i18n.t(key, params)
    }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost/pelan-api/api/',
    withCredentials: true
})

new Vue({
    router,
    store,
    i18n,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
