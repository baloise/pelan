<template>
    <v-flex xs12>

        <h1 class="display-1 primary--text">{{ $t('title') }}</h1>
        <p>{{ $t('text') }}</p>

        <v-card>
            <v-card-text>
                <v-form v-model="rule.valid" ref="form">
                    <v-layout justify-center row wrap @click="change = true">

                        <v-flex xs12>
                            <v-text-field :label="$t('ft.email')" v-model="fd.email" :rules="[rule.min, rule.mail.valid, rule.mail.valid, rule.mail.max]" type="email" />
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field :label="$t('ft.code')" v-model="fd.code" :rules="[rule.min, rule.max]" />
                        </v-flex>

                        <v-flex xs12>
                            <v-btn @click="verify()" color="primary" depressed block :disabled="!change || sending" :loading="sending">
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
</template>

<script>
export default {
    name: 'Verify',
    data () {
        return {
            change: false,
            sending: false,
            fd: {
                email: '',
                code: ''
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
    mounted () {
        if (this.$route.query.email) {
            this.$data.fd.email = this.$route.query.email
            if (this.$route.query.code) {
                this.$data.fd.code = this.$route.query.code
                this.verify()
            }
        }
    },
    i18n: {
        messages: {
            en: {
                title: 'Confirm you Account',
                text: 'Check your E-Mails to find the verification-code we just sent you.',
                created: 'Your Account has been confirmed. You can login now.',
                failed: 'Error: Your Account already is confirmed or you used an invalid code.'
            },
            de: {
                title: 'Bestätige deinen Account',
                text: 'Überprüfe deine E-Mails um den Bestätigungs-Code zu finden, den wir dir gerade gesendet haben.',
                created: 'Dein Account wurde bestätigt. Du kannst dich jetzt anmelden!',
                failed: 'Fehler: Dein Account ist bereits bestätigt oder der Code ist falsch.'
            }
        }
    },
    methods: {
        verify () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            vm.sending = true
            vm.$http.post('user/verify/', vm.fd).then(function (response) {
                vm.sending = false
                vm.$router.push('/login')
                vm.$notify({ type: 'success', text: vm.$t('created') })
            }).catch(function () {
                vm.disabled = false
                vm.$notify({ type: 'error', text: vm.$t('failed') })
            }).then(function () {
                vm.sending = false
            })
        }
    }

}
</script>
