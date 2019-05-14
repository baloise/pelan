<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab icon color="primary" class="mt-4 mb-0">
                <v-icon>add</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Einladungen (Comming soon / Noch nicht verfügbar)</v-toolbar-title>
            </v-toolbar>

            <v-layout row wrap>

                <v-flex xs12 class="pl-3 pr-3">
                    <h1 class="headline primary--text pt-3">Benutzer einladen</h1>

                    <v-form v-model="rule.valid" ref="form">
                        <v-layout row wrap justify-center>
                            <v-flex xs12>
                                <v-text-field label="E-Mail" v-model="fd.email" :rules="[rule.min]" type="email" />
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Vorname" v-model="fd.firstname" :rules="[rule.min]" />
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Nachname" v-model="fd.lastname" :rules="[rule.min]" />
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Nickname" v-model="fd.nickname" :rules="[rule.max, rule.min]" counter="10" />
                            </v-flex>
                            <v-flex xs12 sm6 v-if="roleItems">
                                <v-select label="Rolle" v-model="fd.role" :items="roleItems" :rules="[rule.min]" item-text="title" item-value="id" />
                            </v-flex>
                            <v-flex shrink>
                                <v-btn @click="create()" color="primary" depressed>
                                    Einladung senden
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>

                </v-flex>

                <v-flex xs12 class="pt-4">
                    <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 class="pl-3 pr-3">
                    <h1 class="headline primary--text pt-3">Alle Einladungen</h1>

                    <v-card class="mb-2" v-for="invite in invites" :key="invite.id">
                        <v-card-text>
                            <v-layout row wrap align-center justify-center text-sm-center>
                                <v-flex xs12 md1>
                                    <v-chip>Pendend</v-chip>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <span class="caption">Name</span><br />
                                    <span class="title">{{ invite.firstname }} {{ invite.lastname }}</span>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <span class="caption">E-Mail </span><br />
                                    <span class="">{{ invite.email }}</span>
                                </v-flex>
                                <v-flex xs12 sm6 md2>
                                    <span class="caption">Einladungscode </span><br />
                                    <span class="title primary--text">{{ invite.code }}</span>
                                </v-flex>
                                <v-flex xs12 sm6 md1>
                                    <v-btn flat icon>
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
                firstname: '',
                lastname: '',
                nickname: '',
                role: ''
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('length')
            }
        }
    },

    computed: {

        roleItems () {
            if (this.$store.state.app.roles.length) return this.$store.state.app.roles
            return false
        },

        invites () {
            return [
                {
                    id: 1,
                    firstname: 'Dasistaberein',
                    lastname: 'Sehrlangername',
                    email: 'dasistaberein.sehrlangername@langemail.co.uk.lol',
                    code: 'aaui1267nu',
                    state: 'pending'
                },
                {
                    id: 2,
                    firstname: 'Peter',
                    lastname: 'Pan',
                    email: 'peter@pan.com',
                    code: '12as85k7b0',
                    state: 'pending'
                }
            ]
        }

    },

    methods: {

        create () {
            this.$refs.form.validate()
        },

        delete (id) {

        }

    },

    i18n: {
        messages: {
            en: {
                length: 'Value is too long'
            },
            de: {
                length: 'Wert ist zu lang'
            }
        }
    }

}
</script>
