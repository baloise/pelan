<template>
    <v-app>

        <Drawer/>
        <Toolbar/>

        <v-content>

            <notifications position="bottom center" :width="correctWidth" :speed="500">
                <template slot="body" slot-scope="props">

                <v-alert :value="true" :type="props.item.type" @click="props.close" class="elevation-5 mb-0">
                    {{ props.item.text }}
                </v-alert>

                </template>
            </notifications>

            <transition name="router-view" mode="out-in">
                <router-view :key="'r'+key"></router-view>
            </transition>

        </v-content>

    </v-app>
</template>

<script>
import Drawer from '@/components/Navigation/Drawer'
import Toolbar from '@/components/Navigation/Toolbar'
import { mapActions } from 'vuex'
import(/* webpackPrefetch: true */'@/assets/css/app.css')

export default {
    name: 'App',

    components: {
        Drawer, Toolbar
    },

    computed: {

        correctWidth () {
            if (this.$vuetify.breakpoint.smAndDown) return '100%'
            else if (this.$vuetify.breakpoint.mdAndDown) return '70%'
            else return '50%'
        },

        key () {
            if (this.$store.state.auth.expiration) return this.$store.state.auth.expiration
            else return 'noLogin'
        }

    },

    methods: {

        // Map Store-Functions/Actions
        ...mapActions(['checkAuth']),

        // Get token/login from API
        getLogin (callErr) {
            /* eslint-disable standard/no-callback-literal */
            var vm = this
            vm.$http.get('user/login/').then(function (response) {
                vm.$store.commit('login')
                callErr(false)
            }).catch(function (error) {
                if (error.response.data.reason === 'not_registered') callErr('register')
                else callErr('nopermission')
            })
            /* eslint-enable standard/no-callback-literal */
        },

        // Check Permissions before going to a view
        checkPerms (route) {
            if (route.requiresAdmin === true && !this.$store.state.user.role.admin) return false
            return true
        }

    },

    beforeMount () {
        var vm = this

        // Check permissions before resolving a view
        vm.$router.beforeResolve((to, from, next) => {
            document.title = vm.$store.state.pelan.title + ' | ' + vm.$t('views.' + to.name)
            vm.$store.dispatch('checkAuth')

            if (to.meta.requiresAuth === true && !vm.$store.state.auth.token) {
                vm.getLogin(function (state) {
                    if (!state && vm.checkPerms(to.meta)) next()
                    else vm.$router.push({ name: state })
                })
            } else if (vm.checkPerms(to.meta)) next()
            else vm.$router.push({ name: 'nopermission' })
        })

        // Use correct Language at startup & watch Changes
        vm.$i18n.locale = vm.$store.state.user.language
        vm.$store.watch((state) => {
            return vm.$store.state.user.language
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (vm.$store.state.user.language) vm.$i18n.locale = vm.$store.state.user.language
            }
        })

        // Use token if available
        vm.$store.watch((state) => {
            return vm.$store.state.auth.token
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (vm.$store.state.auth.token) vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + vm.$store.state.auth.token
                else vm.$http.defaults.headers.common['Authorization'] = ''
            }
        })
    }

}
</script>
