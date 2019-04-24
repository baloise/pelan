import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        // General App-Infos & Drawer State
        app: {
            title: 'Pelan',
            version: '0.1',
            drawer: true
        },

        // Auth/Token Infos
        auth: {
            token: true,
            expiration: null,
            lastActive: null
        },

        // User-Details
        user: {
            language: 'de',
            role: {
                title: null,
                admin: false
            }
        }

    },

    mutations: {

        // Show/Hide Drawer
        drawer (state, val) {
            state.app.drawer = val
        }

    },

    actions: {

    }

})
