<template>
    <v-toolbar app class="primary" flat dark clipped-left>

        <v-toolbar-side-icon aria-label="OpenMenu" @click.stop="drawer()"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text" @click="$router.push('/')">
            <h1 class="title">{{ appTitle }}</h1>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-img :src="require('@/assets/baloise/logo.svg')" max-height="40px" contain position="right"></v-img>

    </v-toolbar>
</template>

<script>
export default {
    name: 'Toolbar',

    computed: {

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
