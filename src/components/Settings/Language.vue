<template>
    <v-card>

        <v-card-title class="pt-0 pb-0">
            <h1 class="headline primary--text pt-3">{{ $t('lang') }}</h1>
        </v-card-title>

        <v-card-text class="pt-0">
            <v-form v-model="rule.valid" ref="form">
                <v-select :disabled="rule.loading" v-model="form.language" :rule="rule.require" :items="langItems" @change="changeLang()" />
            </v-form>
            <v-progress-linear indeterminate v-if="rule.loading" class="ma-0"/>
        </v-card-text>

    </v-card>
</template>

<script>
export default {
    name: 'Language',

    data () {
        return {
            form: {
                language: this.$store.state.user.language
            },
            rule: {
                loading: false,
                valid: false,
                require: [v => !!v || this.$t('alert.require')]
            }
        }
    },

    computed: {

        langItems () {
            return [
                { text: this.$t('langs.eng'), value: 'en' },
                { text: this.$t('langs.ger'), value: 'de' }
            ]
        }

    },

    methods: {

        // Save changed lang and redo login-process (to change ui)
        changeLang () {
            var vm = this
            vm.$refs.form.validate()
            if (vm.$data.rule.valid) {
                vm.$data.rule.loading = true
                var lastLang = vm.$store.state.user.language
                vm.$store.state.user.language = vm.$data.form.language

                vm.$http.post('user/edit/', {
                    language: vm.$data.form.language
                }).then(function (response) {
                    vm.$store.commit('login')
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                }).catch(function () {
                    vm.$store.state.user.language = lastLang
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                }).then(function () {
                    vm.$data.rule.loading = false
                })
            }
        }

    },

    i18n: {
        messages: {
            en: {
                lang: 'Language',
                langs: {
                    ger: 'German',
                    eng: 'English'
                }
            },
            de: {
                lang: 'Sprache',
                langs: {
                    ger: 'Deutsch',
                    eng: 'Englisch'
                }
            }
        }
    }

}
</script>
