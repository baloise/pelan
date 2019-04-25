<template>
    <v-app>

        <Drawer />
        <Toolbar />

        <v-content>

            <notifications position="top right">
                <template slot="body" slot-scope="props">
                    <v-alert :value="true" :type="props.item.type" @click="props.close" class="elevation-1">
                        {{ props.item.text }}
                    </v-alert>
                </template>
            </notifications>

            <router-view>
            </router-view>

        </v-content>

    </v-app>
</template>

<script>
import Drawer from '@/components/Navigation/Drawer'
import Toolbar from '@/components/Navigation/Toolbar'
import { mapActions } from 'vuex'

export default {
    name: 'App',

    components: {
        Drawer, Toolbar
    },

    methods: {

        // Map Store-Functions/Actions
        ...mapActions([
            'checkAuth'
        ]),

        // Get token/login from API
        getLogin (callback) {
            var vm = this
            vm.$http.get('user/login/').then(function (response) {
                vm.$store.commit('login')
                vm.checkHeaders()
                callback(true)
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.authFail') })
                callback(false)
            })
        },

        // Check if calls (should) use bearer token
        checkHeaders () {
            var vm = this
            if (!vm.$http.defaults.headers.common['Authorization'] && vm.$store.state.auth.token) {
                vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + vm.$store.state.auth.token
            }
        }

    },

    beforeMount () {
        var vm = this

        // Check permissions before resolving a view
        vm.$router.beforeResolve((to, from, next) => {
            vm.$store.dispatch('checkAuth')
            document.title = vm.$store.state.app.title + ' | ' + vm.$t('views.' + to.name)
            if (to.meta.requiresAuth === true && !vm.$store.state.auth.token) {
                vm.getLogin(function (success) {
                    if (success && !(to.meta.requiresAdmin === true && !vm.$store.state.user.role.admin)) {
                        next()
                    } else {
                        vm.$router.push({ name: 'nopermission' })
                    }
                })
            } else {
                vm.checkHeaders()
                next()
            }
        })

        // Use correct Language at startup & watch Changes
        vm.$i18n.locale = vm.$store.state.user.language
        vm.$store.watch((state) => {
            return vm.$store.state.user.language
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (vm.$store.state.user.language) {
                    vm.$i18n.locale = vm.$store.state.user.language
                }
            }
        })
    }

}

</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Material+Icons');
    @import 'assets/css/app.css';
</style>
