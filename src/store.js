import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        // General App-Info & State
        app: {
            title: 'Pelan',
            version: '1.0',
            env: process.env.VUE_APP_ENV,
            drawer: true,
            loginLoad: true
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
        data: {
            users: [],
            roles: [],
            shifts: [],
            times: [],
            assigns: [],
            invites: [],
            teams: []
        }

    },

    mutations: {

        // Show/Hide Drawer
        drawer (state, val) {
            state.app.drawer = val
        },

        // Login-User / process token and add to state & add cookie
        login (state, prefix) {
            if (!prefix) prefix = Cookies.get('tkn_cookie_prfx')
            else Cookies.set('tkn_cookie_prfx', prefix)
            var token = Cookies.getJSON(prefix + '_app_token'); var now = Math.floor(Date.now() / 1000)
            var dec = JSON.parse(window.atob((token.split('.')[1]).replace('-', '+').replace('_', '/')))

            if (state.user.team && state.user.team.id !== dec.data.team.id) {
                state.data.users = []
                state.data.roles = []
                state.data.shifts = []
                state.data.times = []
                state.data.teams = []
                state.data.assigns = []
                state.data.invites = []
            }

            if (now > dec.exp) {
                Cookies.remove(tokenInfo.prefix + '_app_token')
                state.auth.token = false
                state.auth.expiration = null
                state.user = { language: navigator.language || navigator.userLanguage }
            } else {
                state.user = dec.data
                state.auth.token = token
                state.auth.expiration = dec.exp
                if (!dec.data.language) state.user.language = navigator.language || navigator.userLanguage
            }
        },

        // Logout-User and remove tokens&cookies
        logout (state) {
            var prefix = Cookies.get('tkn_cookie_prfx')
            Cookies.remove(prefix + '_app_token')
            state.data.users = []
            state.data.roles = []
            state.data.shifts = []
            state.data.times = []
            state.data.teams = []
            state.data.assigns = []
            state.data.invites = []
            state.user = { language: navigator.language || navigator.userLanguage }
            state.auth.expiration = null
            state.auth.token = false
        }

    },

    actions: {

        // Check if user/token valid and login/logout
        checkAuth ({ commit, state }) {
            var now = Math.floor(Date.now() / 1000)
            var prefix = Cookies.get('tkn_cookie_prfx')
            if (!state.auth.token && Cookies.getJSON(prefix + '_app_token')) commit('login')
            else if (now > state.auth.expiration) commit('logout')
        }

    },

    modules: {
        Cookies
    }

})
