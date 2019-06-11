<template>
    <v-flex xs12 class="pt-1">
        <v-card class="mb-2" v-for="team in teams" :key="team.id">
            <v-card-text>
                <v-layout row wrap align-center justify-center>

                    <v-flex xs12 md3>
                        <span class="caption">{{ $t('name') }}</span><br />
                        <span class="title">{{ team.title }}</span>
                    </v-flex>

                    <v-flex xs12 md5>
                        <span class="caption">{{ $t('desc') }}</span><br />
                        <span class="">{{ team.description }}</span>
                    </v-flex>

                    <v-flex xs6 md3 class="text-md-right">
                        <span class="caption">{{ $t('owner') }}</span><br />
                        <span class="">{{ team.owner.name }}</span>
                    </v-flex>

                    <v-flex xs6 md1 class="text-xs-right">
                        <v-btn @click="youSure = true, teamLeave = team" :disabled="team.owner.id == $store.state.user.id" flat icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>
            </v-card-text>
        </v-card>
        <p v-if="!teams.length">
            {{ $t('noTeam') }}
        </p>
         <v-dialog persistent v-model="youSure" max-width="700">
                <v-card>
                    <v-card-title class="headline">{{ $t('yousure.title') }}</v-card-title>
                    <v-card-text>
                        {{ $t('yousure.text') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs12 md4 pa-2>
                                <v-btn block aria-label="cancel" @click="youSure = false" outline>
                                    {{ $t('yousure.stop') }}
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 md8 pa-2>
                                <v-btn block aria-label="accept" @click="leaveTeam()" color="warning">
                                    {{ $t('yousure.accept') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>
    </v-flex>
</template>

<script>

export default {
    name: 'Teams',

    data () {
        return {
            youSure: false,
            teamLeave: null
        }
    },

    methods: {

        leaveTeam () {
            var vm = this
            var team = vm.teamLeave
            if (team.owner.id === vm.$store.state.user.id) return false
            vm.$http.post('team/leave/', {
                user: vm.$store.state.user.id,
                team: team.id
            }).then(function (response) {
                vm.$http.post('user/logout/').then(function (response) {
                    vm.$store.commit('logout')
                    vm.$router.push({ name: 'dashboard' })
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        },

        getTeams () {
            var vm = this
            vm.$http.post('team/read/').then(function (response) {
                if (response.data.content) vm.$store.state.data.teams = response.data.content
            })
        }

    },

    computed: {
        teams () {
            if (this.$store.state.data.teams) return this.$store.state.data.teams
            else this.getTeams()
            return false
        }
    },

    i18n: {
        messages: {
            en: {
                noTeam: 'You have not joined a team yet.',
                name: 'Name',
                owner: 'Owner',
                desc: 'Description',
                yousure: {
                    title: 'Are you sure about that?',
                    text: 'Deleting this Team will remove all your assignments too, so you will have to do everything again if you join the team again.',
                    accept: 'I know, delete this Team',
                    stop: 'Cancel deletion'
                }
            },
            de: {
                noTeam: 'Du bist noch in keinem Team.',
                name: 'Name',
                owner: 'Inhaber',
                desc: 'Beschreibung',
                yousure: {
                    title: 'Bist du dir sicher?',
                    text: 'Das löschen von diesem Team wird all deine bestehenden Einsätzen entfernen, wodurch alles neu eingetragen werden müsste, wenn du wieder dem Team beitreten möchtest.',
                    accept: 'Ich weiss, lösche das Team',
                    stop: 'Löschen abbrechen'
                }
            }
        }
    }

}
</script>
