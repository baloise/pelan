<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab icon color="primary" class="mt-3 mb-0">
                <v-icon>add</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t('invites') }}</v-toolbar-title>
            </v-toolbar>

            <v-layout row wrap>

                <v-flex xs12 class="pl-3 pr-3">
                    <h1 class="headline primary--text pt-3">{{ $t('inviteUser') }}</h1>

                    <v-form v-model="rule.valid" ref="form">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 sm5 class="pa-2">
                                <v-text-field :label="$t('detail.email')" v-model="fd.email" :rules="[rule.min, rule.mail]" type="email" />
                            </v-flex>
                            <v-flex xs12 sm5 v-if="roleItems" class="pa-2">
                                <v-select :label="$t('detail.role')" v-model="fd.role" :items="roleItems" :rules="[rule.min]" item-text="title" item-value="id" />
                            </v-flex>
                            <v-flex xs12 sm2 class="pa-2">
                                <v-btn @click="create()" color="primary" depressed block>
                                    {{ $t('send') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>

                </v-flex>

                <v-flex xs12 class="pt-4">
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 class="pl-3 pr-3">
                    <h1 class="headline primary--text pt-3">{{ $t('allInvites') }}</h1>

                    <v-card class="mb-2" v-for="invite in invites" :key="invite.id">
                        <v-card-text>
                            <v-layout row wrap align-center>
                                <v-flex xs12 sm4>
                                    <span class="caption">{{ $t('detail.email') }}</span><br />
                                    <span class="title">{{ invite.email }}</span>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <span class="caption">{{ $t('detail.creator') }}</span><br />
                                    <span class="">{{ invite.creator }}</span>
                                </v-flex>
                                <v-flex xs12 sm2>
                                    <span class="caption">{{ $t('detail.role') }}</span><br />
                                    <span class="">{{ invite.role }}</span>
                                </v-flex>
                                <v-flex xs12 sm2>
                                    <span class="caption">{{ $t('detail.code') }}</span><br />
                                    <span class="title primary--text">{{ invite.code }}</span>
                                </v-flex>
                                <v-flex xs12 sm1 class="text-xs-right">
                                    <v-btn flat icon @click="remove(invite.id)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>

                </v-flex>

            </v-layout>

        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'Invite',

    data () {
        return {
            show: false,
            fd: {
                email: '',
                role: ''
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('length'),
                mail: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.valid')
            }
        }
    },

    computed: {

        roleItems () {
            if (this.$store.state.app.roles.length) return this.$store.state.app.roles
            return false
        },

        invites () {
            if (!this.$store.state.app.invites) return false
            else if (this.$store.state.app.invites.length > 0) {
                return this.$store.state.app.invites
            } else this.getInvites()
            return false
        }

    },

    methods: {

        getInvites () {
            var vm = this
            vm.$http.post('team/invite/read/').then(function (response) {
                if (response.data.content) vm.$store.state.app.invites = response.data.content
                else vm.$store.state.app.invites = false
            })
        },

        create () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.$data.rule.valid) return false
            vm.$http.post('team/invite/create/', vm.fd).then(function (response) {
                vm.getInvites()
                vm.$refs.form.reset()
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        },

        remove (invID) {
            var vm = this
            vm.$http.post('team/invite/delete/', { id: invID }).then(function (response) {
                var str = vm.$store.state.app.invites
                for (var i = 0; i < str.length; i++) {
                    if (str[i].id === invID) str.splice(i, 1)
                }
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        }

    },

    i18n: {
        messages: {
            en: {
                invites: 'Invitations',
                inviteUser: 'Invite User',
                send: 'Send Invite',
                allInvites: 'Existing Invites',
                detail: {
                    email: 'E-Mail',
                    creator: 'Creator',
                    role: 'Role',
                    code: 'Code'
                }
            },
            de: {
                invites: 'Einladungen',
                inviteUser: 'Benutzer einladen',
                send: 'Einladung senden',
                allInvites: 'Bestehende Einladungen',
                detail: {
                    email: 'E-Mail',
                    creator: 'Ersteller',
                    role: 'Rolle',
                    code: 'Code'
                }
            }
        }
    }

}
</script>
