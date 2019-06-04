<template>
    <v-toolbar dense app class="primary" flat dark clipped-left>

        <v-toolbar-side-icon aria-label="OpenMenu" @click.stop="drawer()"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text ml-1" @click="$router.push('/')">
            <h1 class="title">{{ appTitle }}</h1>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-img :src="require('@/assets/baloise/icon.png')" max-height="35px" contain position="right"></v-img>

    </v-toolbar>
</template>

<script>
export default {
    name: 'Toolbar',

    computed: {
        appTitle () {
            if (this.$store.state.user.team) return this.$store.state.user.team.title
            else return this.$store.state.app.title
        }
    },

    methods: {
        drawer () { this.$store.commit('drawer', !this.$store.state.app.drawer) }
    }

}
</script>
