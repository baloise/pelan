<template>
    <v-navigation-drawer app v-model="drawer" class="secondary" clipped floating>

        <v-layout column fill-height v-if="this.$store.state.auth.token">

            <v-list>
                <v-list-tile to="/">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.dashboard') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list>
                <v-list-tile to="/plan">
                    <v-list-tile-action>
                        <v-icon>calendar_today</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.plan') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list v-if="this.$store.state.user.role.admin">
                <v-list-tile to="/plansettings">
                    <v-list-tile-action>
                        <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.plansettings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-spacer></v-spacer>

            <v-list>

                <v-list-tile to="/help">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="body-2">{{ $t('views.help') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/settings">
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
    i18n: {
        messages: {
            en: {
            },
            de: {
            }
        }
    },
    computed: {

        info () {
            return this.$store.state.app.title + ' v' + this.$store.state.app.version
        },

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
