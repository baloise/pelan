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
import Drawer from '@/components/Shared/Drawer'
import Toolbar from '@/components/Shared/Toolbar'
import { mapActions } from 'vuex'

export default {
    name: 'App',

    components: {
        Drawer, Toolbar
    },

    i18n: {
        messages: {
            en: {
                authFail: 'Authentication was not successful.'
            },
            de: {
                authFail: 'Authentifizierung war nicht erfolgreich.'
            }
        }
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
                vm.$notify({ type: 'error', text: vm.$t('authFail') })
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

        // Use correct Language at startup & watch changes
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

    ::-webkit-scrollbar {
        height: 8px;
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f7f7f7;
    }

    ::-webkit-scrollbar-thumb {
        background: #dddddd;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #dddddd;
    }

    @import url('https://fonts.googleapis.com/css?family=Material+Icons');

    @font-face{
        font-family: 'MetaPro Normal';
        src: url('./assets/fonts/meta/Normal.ttf') format("truetype");
    }
    @font-face{
        font-family: 'MetaPro Light';
        src: url('./assets/fonts/meta/Light.ttf') format("truetype");
    }
    @font-face{
        font-family: 'MetaPro Medium';
        src: url('./assets/fonts/meta/Medium.ttf') format("truetype");
    }

    * {
        font-family: 'MetaPro Normal', sans-serif;
    }

    .display-1, .display-2, .display-3, .display-4, .headline, .title, .body-1 {
        font-family: 'MetaPro Medium', sans-serif !important;
    }

    .body-2 {
        font-family: 'MetaPro Normal', sans-serif !important;
    }

    .caption {
        font-family: 'MetaPro Light', sans-serif !important;
        font-size: 15px !important;
    }

    .display-1, .display-2, .display-3, .display-4 {
        font-size: 44px !important;
        line-height: 50px !important;
    }

    .headline {
        font-size: 32px !important;
        line-height: 40px !important;
    }

    .title {
        font-size: 22px !important;
        line-height: 28px !important;
    }

    .body-1, .body-2 {
        font-size: 18px !important;
        line-height: 26px !important;
    }

</style>
