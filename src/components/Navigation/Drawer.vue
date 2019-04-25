<template>
    <v-navigation-drawer app v-model="drawer" class="secondary" clipped floating>

        <v-layout column fill-height v-if="this.$store.state.auth.token">

            <v-list>
                <v-list-tile to="/">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="body-2">{{ $t('views.dashboard') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list>
                <v-list-tile :to="{name: 'plan'}">
                    <v-list-tile-action>
                        <v-icon>calendar_today</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="body-2">{{ $t('views.plan') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list v-if="this.$store.state.user.role.admin">
                <v-list-tile :to="{name: 'plansettings'}">
                    <v-list-tile-action>
                        <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="body-2">{{ $t('views.plansettings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-spacer></v-spacer>

            <v-list>

                <v-list-tile :to="{name: 'help'}">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="body-2">{{ $t('views.help') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'settings'}">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="body-2">{{ $t('views.settings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="caption">
                        {{ info }}
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>

        </v-layout>

    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Drawer',
    computed: {

        // Get Infos about the App
        info () {
            return this.$store.state.app.title + ' v' + this.$store.state.app.version
        },

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
