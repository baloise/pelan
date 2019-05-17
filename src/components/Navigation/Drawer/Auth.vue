<template>
    <v-layout column fill-height>
        <v-list>
            <v-list-tile to="/" class="mb-2 mt-1">
                <v-list-tile-action>
                    <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('views.dashboard') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'plan'}" class="mb-2" v-if="$store.state.user.team">
                <v-list-tile-action>
                    <v-icon>calendar_today</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('views.plan') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-group prepend-icon="cached" v-if="$store.state.user.team && teams">
                <template v-slot:activator>
                    <v-list-tile>
                        <v-list-tile-title>{{ $t('views.teamchange') }}</v-list-tile-title>
                    </v-list-tile>
                </template>
                <v-list-tile v-for="team in teams" @click="setTeam(team.id)" :key="team.id" class="mb-2">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ team.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>launch</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list-group>
            <v-list-group prepend-icon="edit" v-if="this.$store.state.user.role.admin">
                <template v-slot:activator>
                    <v-list-tile>
                        <v-list-tile-title>{{ $t('views.edits') }}</v-list-tile-title>
                    </v-list-tile>
                </template>
                <v-list-tile :to="{name: 'plansettings'}" class="mb-2">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.plansettings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{name: 'teamsettings'}" class="mb-2">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('views.teamsettings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
        </v-list>

        <v-spacer></v-spacer>

        <v-list>
            <v-list-tile :to="{name: 'settings'}">
                <v-list-tile-action>
                    <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('views.settings') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="logout()">
                <v-list-tile-action>
                    <v-icon>exit_to_app</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('views.logout') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'help'}">
                <v-list-tile-action>
                    <v-icon>question_answer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('views.help') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content class="caption">
                    {{ info }}
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

    </v-layout>
</template>

<script>
export default {
    name: 'Auth',

    methods: {

        getTeams () {
            var vm = this
            vm.$http.post('team/read/').then(function (response) {
                if (response.data.content) vm.$store.state.data.teams = response.data.content
            })
        },

        setTeam (newTeam) {
            var vm = this
            vm.$http.post('user/team/change/', {
                team: newTeam
            }).then(function (response) {
                vm.$store.commit('login')
                if (vm.$route.meta.requiresAdmin) vm.$router.push('/')
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.authFail') })
            })
        },

        logout () {
            var vm = this
            vm.$http.post('user/logout/').then(function (response) {
                vm.$store.commit('logout')
                vm.$router.push({ name: 'login' })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.authFail') })
            })
        }

    },

    computed: {

        doTeam: {

            get () {
                return parseInt(this.$store.state.user.team.id)
            },

            set (newTeam) {
                var vm = this
                vm.$http.post('user/team/change/', {
                    team: newTeam
                }).then(function (response) {
                    vm.$store.commit('login')
                    if (vm.$route.meta.requiresAdmin) vm.$router.push('/')
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                })
            }

        },

        teams () {
            var vm = this.$store.state; var tmp = []
            if (vm.data.teams.length !== 0) {
                vm.data.teams.forEach(function (obj) {
                    if (vm.user.team.id !== obj.id) tmp.push(obj)
                })
                if (tmp.length > 0) return tmp
            } else this.getTeams()
            return false
        },

        // Get Infos about the App
        info () {
            return this.$store.state.app.title + ' v' + this.$store.state.app.version
        }

    }

}
</script>
