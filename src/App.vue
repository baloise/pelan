<template>
    <v-app>

        <Drawer />
        <Toolbar />

        <v-content>
            <v-container fluid pa-0 fill-height>
                <notifications position="top center"></notifications>
                <transition name="fade" mode="out-in">
                    <router-view>
                    </router-view>
                </transition>
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
import Drawer from '@/components/Shared/Drawer'
import Toolbar from '@/components/Shared/Toolbar'

export default {
    name: 'App',

    components: {
        Drawer, Toolbar
    },

    beforeMount(){

        // Change Brower-Tab Title after page change
        this.$router.afterEach((to, from) => {
            document.title = this.$store.state.app.title + ' | ' + this.$t('views.' + to.name)
        })

        // Use correct Language at startup & track change
        this.$i18n.locale = this.$store.state.user.language
        this.$store.watch((state) => {
            return this.$store.state.user.language
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (this.$store.state.user.language) {
                    this.$i18n.locale = this.$store.state.user.language
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
