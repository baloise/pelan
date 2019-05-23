<template>
    <v-toolbar :dense="$store.state.app.denseBar" app class="primary" flat dark clipped-left>

        <v-toolbar-side-icon aria-label="OpenMenu" @click.stop="drawer()"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text ml-1" @click="$router.push('/')">
            <h1 class="title">{{ appTitle }}</h1>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-img v-if="!$vuetify.breakpoint.xsOnly" :src="require('@/assets/baloise/logo.svg')" :max-height="imgHeight" contain position="right"></v-img>
        <v-img v-else :src="require('@/assets/baloise/icon.png')" :max-height="imgHeight" contain position="right"></v-img>

    </v-toolbar>
</template>

<script>
export default {
    name: 'Toolbar',

    computed: {

        imgHeight () {
            if (this.$store.state.app.denseBar) return '28px'
            else return '30px'
        },

        // Get title of app
        appTitle () {
            if (this.$store.state.user.team) return this.$store.state.user.team.title
            else return this.$store.state.app.title
        }

    },

    methods: {

        // Show/Hide drawer
        drawer () { this.$store.commit('drawer', !this.$store.state.app.drawer) }

    }

}
</script>
