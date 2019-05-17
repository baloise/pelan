<template>
    <v-form v-model="rule.valid" ref="form">
        <v-layout row wrap @click="change = true">

            <v-flex xs12 md4>
                <v-text-field :label="$t('ft.firstname')" v-model="fd.firstname" :rules="[rule.min]" />
            </v-flex>
            <v-flex xs12 md4>
                <v-text-field :label="$t('ft.lastname')" v-model="fd.lastname" :rules="[rule.min]" />
            </v-flex>
            <v-flex xs12 md4>
                <v-text-field :label="$t('ft.nickname')" v-model="fd.nickname" :rules="[rule.min, rule.max]" counter="10" />
            </v-flex>
            <v-flex xs12>
                <v-select :label="$t('ft.language')" v-model="fd.language" :rules="[rule.min]" :items="langItems" hide-selected />
            </v-flex>

            <v-flex xs12>
                <v-btn @click="save()" color="primary" depressed block :disabled="!change || sending" :loading="sending">
                    {{ $t('btn.save') }}
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-flex>

        </v-layout>
    </v-form>
</template>

<script>
export default {
    name: 'Details',

    data () {
        return {
            change: false,
            sending: false,
            fd: {
                firstname: this.$store.state.user.firstname,
                lastname: this.$store.state.user.lastname,
                nickname: this.$store.state.user.nickname,
                language: this.$store.state.user.language
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('alert.length')
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

        // Save changed lang and redo login-process (to change ui)
        save () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.$data.rule.valid) return false

            var lastLang = vm.$store.state.user.language
            vm.$store.state.user.language = vm.$data.fd.language

            vm.$data.sending = true
            vm.$http.post('user/edit/', vm.fd).then(function (response) {
                vm.$data.change = false
                vm.$store.commit('login')
                vm.$router.push('/')
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$store.state.user.language = lastLang
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            }).then(function () {
                vm.$data.sending = false
            })
        }

    }

}
</script>
