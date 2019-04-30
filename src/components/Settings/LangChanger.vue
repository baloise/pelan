<template>
    <v-layout row wrap>

        <v-flex xs6>
            <v-form v-model="rules.valid" ref="formData">
                <v-select v-model="form.language" :rules="rules.require" :items="langItems" item-text="text" item-value="value"></v-select>
            </v-form>
        </v-flex>

        <v-flex xs6>
            <v-btn :loading="rules.loading" :disabled="rules.loading" @click="changeLang()" depressed large color="primary">
                {{ $t('btn.save') }}
                <span slot="loader" class="spinning-loader">
                    <v-icon light>cached</v-icon>
                </span>
            </v-btn>
        </v-flex>

    </v-layout>
</template>

<script>
export default {
    name: 'LangChanger',

    data () {
        return {
            form: {
                language: this.$store.state.user.language
            },
            rules: {
                loading: false,
                valid: false,
                require: [
                    v => !!v || this.$t('alert.require')
                ]
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
            vm.$data.disabled = true
            vm.$refs.formData.validate()

            if (vm.$data.rules.valid) {
                vm.$http.post('user/edit/', {
                    language: vm.$data.form.language
                }).then(function (response) {
                    vm.$store.commit('login')
                    vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + vm.$store.state.auth.token
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                }).catch(function () {
                    vm.disabled = false
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                })
            }
        }

    },

    i18n: {
        messages: {
            en: {
                langs: {
                    ger: 'German',
                    eng: 'English'
                }
            },
            de: {
                langs: {
                    ger: 'Deutsch',
                    eng: 'Englisch'
                }
            }
        }
    }

}
</script>
