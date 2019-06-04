<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" max-width="500px">

        <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab icon color="primary" class="mt-2">
                <v-icon>add</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-toolbar dark color="primary" flat>
                <v-btn icon dark @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t('add') }}</v-toolbar-title>
            </v-toolbar>

            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3 pb-2 pt-3">
                    <v-form v-model="rule.valid" ref="createForm">
                        <v-text-field :label="$t('title')" v-model="fnew.title" :rules="[rule.min]"/>
                        <v-textarea :label="$t('desc')" v-model="fnew.description" :rules="[rule.min]" />
                        <v-checkbox :label="$t('admin')" v-model="fnew.admin" color="primary" class="pl-4"></v-checkbox>
                        <v-btn color="primary" block depressed @click="create()">
                            {{ $t('create') }}
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
            if (!vm.rule.valid) return false
            vm.$http.post('role/create/', vm.fnew).then(function (response) {
                vm.$store.state.data.roles.push({
                    id: response.data.content,
                    title: vm.fnew.title,
                    description: vm.fnew.description,
                    admin: vm.fnew.admin
                })
                vm.$refs.createForm.reset()
                vm.show = false
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        }

    },

    i18n: {
        messages: {
            en: {
                add: 'Create new role',
                title: 'Title',
                desc: 'Description',
                admin: 'Admin-Permissions',
                create: 'Create role'
            },
            de: {
                add: 'Neue Rolle erstellen',
                title: 'Titel',
                desc: 'Beschreibung',
                admin: 'Adminrechte',
                create: 'Rolle erstellen'
            }
        }
    }

}
</script>
