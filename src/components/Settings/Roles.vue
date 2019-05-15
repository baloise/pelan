<template>
    <v-form v-model="isValid" ref="formData">
        <v-card class="elevation-0">

            <v-card-title class="pt-0">
                <h1 class="title primary--text pt-3">{{ $t('roles') }}</h1>
                <v-spacer></v-spacer>
                <v-btn disabled small fab icon color="primary" class="mt-4 mb-0"><v-icon>add</v-icon></v-btn>
            </v-card-title>

            <v-data-table v-if="false" :loading="loading.users" :headers="headers" :items="roleList" :pagination.sync="pagination">
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:items="props">

                    <td>
                        <v-edit-dialog :return-value.sync="props.item.title" @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>
                            {{ props.item.title }}
                            <template v-slot:input>
                                <v-text-field v-model="props.item.title" :rules="[minChars]"></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </td>

                    <td>
                        <v-edit-dialog :return-value.sync="props.item.description" @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>
                            {{ props.item.description }}
                            <template v-slot:input>
                                <v-text-field v-model="props.item.description" :rules="[minChars]"></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </td>

                    <td>
                        <v-checkbox v-model="props.item.admin" @input="close(props.item)" color="primary" primary hide-details></v-checkbox>
                    </td>

                    <td>
                        <v-btn flat icon color="primary">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>

                </template>

            </v-data-table>

        </v-card>

    </v-form>
</template>

<script>
export default {
    name: 'Users',

    data () {
        return {
            pagination: {
                rowsPerPage: 10
            },
            minChars: v => v.length >= 1 || this.$t('alert.require'),
            maxChars: v => v.length < 11 || this.$t('length'),
            isValid: false,
            roleList: []
        }
    },

    computed: {

        // To see if data is loaded
        loading () {
            var vm = this
            var users = true
            var roles = true
            if (vm.$store.state.app.users.length) users = false
            if (vm.roleItems) roles = false
            return {
                users: users,
                roles: roles
            }
        },

        // Return list for select
        roleItems () {
            if (this.roleList.length) return this.roleList
            return false
        },

        // Table-headers
        headers () {
            return [{
                text: this.$t('role.title'),
                value: 'title'
            },
            {
                text: this.$t('role.description'),
                value: 'description'
            },
            {
                text: this.$t('role.admin'),
                value: 'admin'
            },
            {
                text: this.$t('role.delete'),
                value: ''
            }
            ]
        }

    },

    methods: {

        // Save changes and close dialog
        close (item) {
            var vm = this
            vm.$refs.formData.validate()
            if (!vm.$data.isValid) {
                vm.$notify({
                    type: 'error',
                    text: vm.$t('valueWrong')
                })
            } else {
                vm.$http.post('role/edit/', item).then(function (response) {
                    vm.$notify({
                        type: 'success',
                        text: vm.$t('alert.success')
                    })
                    if (item.id === vm.$store.state.user.id) {
                        vm.$store.commit('login')
                        vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + vm.$store.state.auth.token
                    }
                }).catch(function () {
                    vm.$notify({
                        type: 'error',
                        text: vm.$t('alert.error')
                    })
                })
            }
        }

    },

    mounted () {
        var vm = this

        // Get available roles of team
        vm.$http.get('role/read/').then(function (response) {
            if (response.data.content) vm.roleList = response.data.content
            else {
                vm.$notify({
                    type: 'error',
                    text: vm.$t('alert.loadFail')
                })
            }
        }).catch(function () {
            vm.$notify({
                type: 'error',
                text: vm.$t('alert.loadFail')
            })
        })
    },

    i18n: {
        messages: {
            en: {
                roles: 'Roles (comming soon)',
                length: 'Value is too long',
                valueWrong: 'Invalid value set',
                role: {
                    title: 'Title',
                    description: 'Description',
                    admin: 'Admin',
                    delete: 'Remove'
                }
            },
            de: {
                roles: 'Rollen (in Entwicklung)',
                length: 'Wert ist zu lang',
                valueWrong: 'Fehlerhafte Eingabe',
                role: {
                    title: 'Titel',
                    description: 'Beschreibung',
                    admin: 'Admin',
                    delete: 'Löschen'
                }
            }
        }
    }

}
</script>
