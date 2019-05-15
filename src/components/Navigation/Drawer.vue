<template>
    <v-navigation-drawer app v-model="drawer" class="baloise-drawer secondary" clipped floating>

        <v-layout column fill-height v-if="this.$store.state.auth.token">

            <v-list>
                <v-list-tile to="/" class="mb-2 mt-1">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.dashboard') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'plan'}" class="mb-2">
                    <v-list-tile-action>
                        <v-icon>calendar_today</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.plan') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-if="this.$store.state.user.role.admin" :to="{name: 'plansettings'}" class="mb-2">
                    <v-list-tile-action>
                        <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.plansettings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list-tile v-if="$store.state.user.team && teams">
                <v-list-tile-action>
                    <v-icon>swap_horiz</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-select dense solo hide-details v-model="doTeam" :items="teams" hide-selected/>
                </v-list-tile-content>
            </v-list-tile>

            <v-spacer></v-spacer>

            <v-list>

                <v-list-tile :to="{name: 'help'}">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.help') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'settings'}">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.settings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="caption">
                        {{ info }}
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>

        </v-layout>

        <v-layout column fill-height v-else>
            <v-list>
                <v-list-tile :to="{name: 'register'}">
                    <v-list-tile-action>
                        <v-icon>how_to_reg</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="title">{{ $t('views.register') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{name: 'help'}">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="title">{{ $t('views.help') }}</v-list-tile-title>
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

    methods: {

        getTeams () {
            var vm = this
            vm.$http.post('team/read/').then(function (response) {
                if (response.data.content) vm.$store.state.app.teams = response.data.content
            })
        }

    },

    computed: {

        doTeam: {

            get () {
                return this.$store.state.user.team.id
            },

            set (newTeam) {
                var vm = this
                vm.$http.post('user/team/change/', {
                    team: newTeam
                }).then(function (response) {
                    vm.$store.commit('login')
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.authFail') })
                })
            }

        },

        teams () {
            if (this.$store.state.app.teams.length !== 0) {
                if (this.$store.state.app.teams.length > 1) {
                    return this.$store.state.app.teams.map(obj => {
                        return { value: obj.id, text: obj.title }
                    })
                }
            } else this.getTeams()
            return false
        },

        // Get Infos about the App
        info () { return this.$store.state.pelan.title + ' v' + this.$store.state.pelan.version },

        // Change state (visible/hidden) of drawer
        drawer: {
            get () { return this.$store.state.pelan.drawer },
            set (val) { this.$store.commit('drawer', val) }
        }

    }

}
</script>
