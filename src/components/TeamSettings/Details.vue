<template>
    <v-form v-model="rule.valid" ref="form">
        <v-layout row wrap>
            <v-flex xs12 @click="change = true">
                <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="[rule.min]" />
            </v-flex>
            <v-flex xs12 @click="change = true">
                <v-textarea :label="$t('ft.desc')" v-model="fd.description" :rules="[rule.min]" />
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
                title: this.$store.state.user.team.title,
                description: this.$store.state.user.team.description
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('alert.length')
            }
        }
    },

    methods: {

        // Save changed lang and redo login-process (to change ui)
        save () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.$data.rule.valid) return false

            vm.$data.sending = true
            vm.$http.post('team/edit/', vm.fd).then(function (response) {
                vm.$data.change = false
                vm.$store.commit('login', response.data.content)
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            }).then(function () {
                vm.$data.sending = false
            })
        }

    }

}
</script>
