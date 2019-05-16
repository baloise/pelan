<template>
    <v-form v-model="rule.valid" ref="form">
        <v-select :disabled="rule.loading" v-model="form.language" :rule="rule.require" :items="langItems" @change="changeLang()" hide-selected dense hide-details/>
        <v-progress-linear indeterminate v-if="rule.loading" class="ma-0"/>
    </v-form>
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
                { text: this.$t('language.en'), value: 'en' },
                { text: this.$t('language.de'), value: 'de' }
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

    }

}
</script>
