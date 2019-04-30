import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        // General App-Info & State
        pelan: {
            title: 'Pelan',
            version: '0.1',
            drawer: true
        },

        // Auth/Token Info
        auth: {
            token: false,
            expiration: null
        },

        // User-Details
        user: {
            language: 'de'
        },

        // Globally used/dynamic app-data
        app: {
            users: [],
            shifts: [],
            times: [],
            assigns: []
        }

    },

    mutations: {

        // Show/Hide Drawer
        drawer (state, val) {
            state.pelan.drawer = val
        },

        // Login-User / process token and add to state & add cookie
        login (state) {
            var token = Cookies.getJSON('app_token')
            var encoded = (token.split('.')[1]).replace('-', '+').replace('_', '/')
            var decoded = JSON.parse(window.atob(encoded))
            var now = Math.floor(Date.now() / 1000)

            if (now > decoded.exp) {
                Cookies.remove('app_token')
                state.auth.token = false
                state.auth.expiration = null
                state.user = { language: navigator.language || navigator.userLanguage }
            }

            state.auth.token = token
            state.user = decoded.data
            state.auth.expiration = decoded.exp
            if (!decoded.data.language) {
                state.user.language = navigator.language || navigator.userLanguage
            }
        },

        // Logout-User and remove tokens&cookies
        logout (state) {
            Cookies.remove('app_token')
            state.auth.token = false
            state.auth.expiration = null
            state.user = { language: navigator.language || navigator.userLanguage }
        }

    },

    actions: {

        // Check if user/token valid and login/logout
        checkAuth ({ commit, state }) {
            var now = Math.floor(Date.now() / 1000)
            if (!state.auth.token && Cookies.getJSON('app_token')) {
                commit('login')
            } else if (now > state.auth.expiration) {
                commit('logout')
            }
        }

    },

    modules: {
        Cookies
    }

})
