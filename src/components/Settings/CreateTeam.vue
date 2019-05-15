<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" max-width="500px">

        <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab icon color="primary" class="mt-3">
                <v-icon>add</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-toolbar dark color="primary" flat>
                <v-btn icon dark @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Team hinzufügen</v-toolbar-title>
            </v-toolbar>

            <v-layout row wrap>

                <v-flex xs12 class="pl-3 pr-3 pt-3">
                    <p>
                        Hast du einen Einladungscode und möchtest einem
                        bestehenden Team beitreten? Oder möchtest du ein
                        neues Team erstellen?
                    </p>
                </v-flex>

                <v-flex xs12 sm6 class="pl-2 pr-2">
                    <v-btn color="primary" block depressed @click="choice = 1" :disabled="choice===1">
                        Einladungscode eingeben
                    </v-btn>
                </v-flex>
                <v-flex xs12 sm6 class="pl-2 pr-2">
                    <v-btn color="primary" block depressed @click="choice = 2" :disabled="choice===2">
                        Neues Team erstellen
                    </v-btn>
                </v-flex>

                <v-flex xs12 v-if="choice">
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 class="pl-3 pr-3 pb-3 pt-3" v-if="choice === 1">
                    <v-form v-model="rule.valid" ref="joinForm">
                        <v-text-field label="Einladungscode" v-model="fexist.code" :rules="[rule.min]"/>
                        <v-btn color="primary" block depressed @click="join()">
                            Beitreten
                        </v-btn>
                    </v-form>
                </v-flex>

                <v-flex xs12 class="pl-3 pr-3 pb-2 pt-3" v-if="choice === 2">
                    <v-form v-model="rule.valid" ref="createForm">
                        <v-text-field label="Name" v-model="fnew.title" :rules="[rule.min]"/>
                        <v-textarea label="Beschreibung" v-model="fnew.description" :rules="[rule.min]" />
                        <v-btn color="primary" block depressed @click="create()">
                            Team erstellen
                        </v-btn>
                    </v-form>
                </v-flex>

            </v-layout>

        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'CreateTeam',

    data () {
        return {
            show: false,
            choice: false,
            fexist: {
                code: ''
            },
            fnew: {
                title: '',
                description: ''
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('length')
            }
        }
    },

    methods: {

        join () {
            var vm = this
            vm.$refs.joinForm.validate()
            if (!vm.$data.rule.valid) return false
            vm.$http.post('team/join/', vm.fexist).then(function (response) {
                vm.$store.state.app.teams.push({
                    id: response.data.content.id,
                    title: response.data.content.title,
                    description: response.data.content.description
                })
                vm.change(response.data.content.id)
                vm.$notify({ type: 'success', text: vm.$t('notif.joined') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('notif.nojoin') })
            })
        },

        create () {
            var vm = this
            vm.$refs.createForm.validate()
            if (!vm.$data.rule.valid) return false
            vm.$http.post('team/create/', vm.fnew).then(function (response) {
                vm.$store.state.app.teams.push({
                    id: response.data.content.id,
                    title: vm.fnew.title,
                    description: vm.fnew.description
                })
                vm.change(response.data.content.id)
                vm.$notify({ type: 'success', text: vm.$t('notif.created') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        },

        change (teamid) {
            var vm = this
            vm.$http.post('user/team/change/', {
                team: teamid
            }).then(function (response) {
                vm.$store.commit('login')
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.authFail') })
            })
        }

    },

    i18n: {
        messages: {
            en: {
                length: 'Value is too long',
                notif: {
                    created: 'The team has been created. You have been redirected to the new team.',
                    joined: 'You successfully joined the team and have been redirected to it.',
                    nojoin: 'Unable to join team. Invitation was not found or has expired.'
                }
            },
            de: {
                length: 'Wert ist zu lang',
                notif: {
                    created: 'Das Team wurde erfolgreich erstellt. Du wurdest zum neuen Team weitergeleitet.',
                    joined: 'Du bist dem Team erfolgreich beigetreten und wurdest dahin weitergeleitet.',
                    nojoin: 'Dem Team konnte nicht beigetreten werden. Die Einladung wurde nicht gefunden oder ist abgelaufen.'
                }
            }
        }
    }

}
</script>
