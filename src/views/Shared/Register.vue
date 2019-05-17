<template>
    <v-container grid-list-xs fill-height>
        <v-layout row wrap align-center>

            <v-flex xs12>
                <h1 class="display-1 primary--text">Konto erstellen</h1>
                <p>Scheinbar bist du zum ersten Mal hier.</p>

                <v-card>
                    <v-card-text>
                        <v-form v-model="rule.valid" ref="form">
                            <v-layout row wrap @click="change = true">

                                <v-flex xs12>
                                    <h1 class="title primary--text">Grundlagen</h1>
                                    <span>Lass uns wissen wer du bist.</span>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field :label="$t('ft.firstname')" v-model="fd.firstname" :rules="[rule.min]" />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field :label="$t('ft.lastname')" v-model="fd.lastname" :rules="[rule.min]" />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field :label="$t('ft.email')" v-model="fd.email" :rules="[rule.min, rule.mail.valid, rule.mail.valid, rule.mail.max]" type="email" />
                                </v-flex>

                                <v-flex xs12>
                                    <v-divider class="pb-3"></v-divider>
                                    <h1 class="title primary--text">Konto</h1>
                                    <span>
                                        Dein Spitzname erscheint im Plan auf der linken Seite und sollte nicht zu viel Platz verbrauchen.
                                        Wähle deshalb einen kurzen Spitznamen aus.
                                    </span>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field :label="$t('ft.nickname')" v-model="fd.nickname" :rules="[rule.min, rule.max]" counter="10" />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :label="$t('ft.language')" v-model="fd.language" :rules="[rule.min]" :items="langItems" hide-selected />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field :label="$t('ft.password')" v-model="fd.password" :rules="[rule.min]" type="password" />
                                </v-flex>

                                <v-flex xs12 class="pa-2">
                                    <v-divider class="pb-3"></v-divider>
                                    <v-btn @click="register()" color="primary" depressed block :disabled="!change || sending" :loading="sending">
                                        {{ $t('btn.send') }}
                                        <span slot="loader" class="spinning-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                    </v-btn>
                                </v-flex>

                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>

            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Register',

    data () {
        return {
            change: false,
            sending: false,
            fd: {
                firstname: '',
                lastname: '',
                email: '',
                nickname: '',
                language: '',
                password: ''
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('alert.length'),
                mail: {
                    valid: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.valid'),
                    max: v => v.length < 90 || this.$t('alert.length')
                }
            }
        }
    },

    computed: {

        langItems () {
            return [
                { text: this.$t('language.en'), value: 'en' },
                { text: this.$t('language.de'), value: 'de' }
            ]
        }

    },

    methods: {

        register () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.$data.rule.valid) return false

            vm.$data.sending = true
            vm.$http.post('user/create/', {
                withLogin: 1, user: vm.fd
            }).then(function (response) {
                vm.$data.change = false
                vm.$store.commit('login', response.data.content)
                vm.$router.push('/')
                vm.$notify({ type: 'success', text: vm.$t('alert.register') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            }).then(function () {
                vm.$data.sending = false
            })
        }

    }

}
</script>
