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
                                    <v-btn @click="login()" color="primary" depressed block :disabled="sending" :loading="sending">
                                        {{ $t('btn.login') }}
                                        <span slot="loader" class="spinning-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
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
            sending: false,
            fd: {
                email: 'xx0001@demo.com',
                password: 'xx0001'
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

            vm.$data.sending = true
            vm.$http.post('user/login/', vm.fd).then(function (response) {
                vm.$store.commit('login')
                vm.$router.push('/')
            }).catch(function () {
                vm.$data.sending = false
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            }).then(function () {
                vm.$data.sending = false
            })
        }

    }

}
</script>
