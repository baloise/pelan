<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" max-width="500px">

        <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab icon color="primary" class="mt-3">
                <v-icon>add</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-toolbar dark color="primary" flat>
                <v-btn icon dark @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Rolle hinzufügen</v-toolbar-title>
            </v-toolbar>

            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3 pb-2 pt-3">
                    <v-form v-model="rule.valid" ref="createForm">
                        <v-text-field label="Titel" v-model="fnew.title" :rules="[rule.min]"/>
                        <v-textarea label="Beschreibung" v-model="fnew.description" :rules="[rule.min]" />
                        <v-checkbox label="Adminrechte" v-model="fnew.admin" color="primary" class="pl-4"></v-checkbox>

                        <v-btn color="primary" block depressed @click="create()">
                            Rolle erstellen
                        </v-btn>
                    </v-form>
                </v-flex>
            </v-layout>

        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'CreateRole',

    data () {
        return {
            show: false,
            fnew: {
                title: '',
                description: '',
                admin: ''
            },
            rule: {
                valid: false,
                min: v => !!v || this.$t('alert.require'),
                max: v => v.length < 11 || this.$t('length')
            }
        }
    },

    methods: {

        create () {
            var vm = this
            vm.$refs.createForm.validate()
            if (!vm.$data.rule.valid) return false
            vm.$http.post('role/create/', vm.fnew).then(function (response) {
                vm.$store.state.app.roles.push({
                    id: response.data.content.id,
                    title: vm.fnew.title,
                    description: vm.fnew.description,
                    admin: vm.fnew.admin
                })
                vm.$refs.createForm.reset()
                vm.show = false
                vm.$notify({ type: 'success', text: vm.$t('notif.created') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        }

    },

    i18n: {
        messages: {
            en: {
                length: 'Value is too long',
                notif: {
                    created: 'The team has been created. You have been redirected to the new team.',
                    joined: 'You successfully joined the team and have been redirected to it.',
                    nojoin: 'Unable to join team. Invitation was not found or has expired.'
                }
            },
            de: {
                length: 'Wert ist zu lang',
                notif: {
                    created: 'Das Team wurde erfolgreich erstellt. Du wurdest zum neuen Team weitergeleitet.',
                    joined: 'Du bist dem Team erfolgreich beigetreten und wurdest dahin weitergeleitet.',
                    nojoin: 'Dem Team konnte nicht beigetreten werden. Die Einladung wurde nicht gefunden oder ist abgelaufen.'
                }
            }
        }
    }

}
</script>
