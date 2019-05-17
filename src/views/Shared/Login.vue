<template>
    <v-container grid-list-xs fill-height>
        <v-layout row wrap align-center justify-center>

            <v-flex xs12 sm6 text-xs-center>
                <h1 class="display-1 primary--text">Willkommen!</h1>
                <p>Hast du bereits ein Konto bei Pelan?</p>

                <v-card>
                    <v-card-text>
                        <v-form v-model="rule.valid" ref="form">
                            <v-layout row wrap>

                                <v-flex xs12>
                                    <v-text-field :label="$t('ft.email')" v-model="fd.email" :rules="[rule.min, rule.mail.valid, rule.mail.valid, rule.mail.max]" type="email" />
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field :label="$t('ft.password')" v-model="fd.password" :rules="[rule.min]" type="password" />
                                </v-flex>

                                <v-flex xs12 class="pl-2 pr-2 pb-1">
                                    <v-divider class="pb-3"></v-divider>
                                    <v-btn @click="login()" color="primary" depressed block>
                                        {{ $t('ft.login') }}
                                    </v-btn>
                                </v-flex>

                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>

                <p class="pt-3">Oder möchtest du ein Konto erstellen?</p>
                <v-btn :to="{name: 'register'}" color="grey" dark depressed block>
                    Konto erstellen
                </v-btn>

            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Login',

    data () {
        return {
            fd: {
                email: '',
                password: ''
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('length'),
                mail: {
                    valid: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.valid'),
                    max: v => v.length < 90 || this.$t('length')
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

        login () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.$data.rule.valid) return false
            vm.$http.post('user/login/', vm.fd).then(function (response) {
                vm.$store.commit('login')
                vm.$router.push('/')
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        }

    },

    i18n: {
        messages: {
            en: {
                ft: {
                    email: 'E-Mail',
                    password: 'Password',
                    login: 'Login'
                }
            },
            de: {
                ft: {
                    email: 'E-Mail',
                    password: 'Passwort',
                    login: 'Anmelden'
                }
            }
        }
    }

}
</script>
