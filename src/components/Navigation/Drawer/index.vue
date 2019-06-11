<template>
    <v-navigation-drawer app v-model="drawer" class="baloise-drawer secondary lighten2" clipped floating>
        <Auth v-if="$store.state.auth.token" />
        <NoAuth v-else-if="!$store.state.app.loginLoad" />
    </v-navigation-drawer>
</template>

<script>
import NoAuth from '@/components/Navigation/Drawer/NoAuth'
import Auth from '@/components/Navigation/Drawer/Auth'

export default {
    name: 'Drawer',

    components: {
        NoAuth, Auth
    },

    computed: {

        // Change state (visible/hidden) of drawer
        drawer: {
            get () {
                return this.$store.state.app.drawer
            },
            set (val) {
                this.$store.commit('drawer', val)
            }
        }

    }

}
</script>
