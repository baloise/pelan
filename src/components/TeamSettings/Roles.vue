<template>
    <v-flex xs12 class="pt-1">
        <v-card>
            <v-form v-model="isValid" ref="formData">

                <v-data-table :loading="loading.users" :headers="headers" :items="roleList" :pagination.sync="pagination">
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
                            <v-checkbox v-model="props.item.admin" :disabled="isMain(props.item.main)" @change="close(props.item)" color="primary" hide-details></v-checkbox>
                        </td>

                        <td>
                            <v-btn flat icon :disabled="isMain(props.item.main)" @click="removeRole(props.item.id)"><v-icon>delete</v-icon></v-btn>
                        </td>

                    </template>
                </v-data-table>

            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'Roles',

    data () {
        return {
            pagination: {
                rowsPerPage: 10
            },
            minChars: v => v.length >= 1 || this.$t('alert.require'),
            maxChars: v => v.length < 11 || this.$t('length'),
            isValid: false
        }
    },

    computed: {

        // To see if data is loaded
        loading () {
            var vm = this
            var roles = true
            if (vm.roleItems) roles = false
            return {
                roles: roles
            }
        },

        // Return list for select
        roleList () {
            return this.$store.state.data.roles
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

        isMain (mainInt) {
            if (mainInt === 1) return true
            return false
        },

        removeRole (roleid) {
            var vm = this
            vm.$http.post('role/delete/', { id: roleid }).then(function (response) {
                var str = vm.$store.state.data.roles
                for (var i = 0; i < str.length; i++) {
                    if (str[i].id === roleid) str.splice(i, 1)
                }
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function (error) {
                if (error.response.data.reason === 'role_has_user_or_invitation') {
                    vm.$notify({ type: 'warning', text: vm.$t('hasUser') })
                } else vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        },

        // Save changes and close dialog
        close (item) {
            var vm = this
            vm.$refs.formData.validate()
            if (!vm.$data.isValid) {
                vm.$notify({ type: 'error', text: vm.$t('valueWrong') })
            } else {
                vm.$http.post('role/edit/', item).then(function (response) {
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                })
            }
        }

    },

    mounted () {
        var vm = this

        // Get available roles of team
        vm.$http.get('role/read/').then(function (response) {
            vm.$store.state.data.roles = response.data.content
        }).catch(function () {
            vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
        })
    },

    i18n: {
        messages: {
            en: {
                roles: 'Roles',
                length: 'Value is too long',
                valueWrong: 'Invalid value set',
                hasUser: 'Please remove this role from all existing users and invitations first.',
                role: {
                    title: 'Title',
                    description: 'Description',
                    admin: 'Admin',
                    delete: 'Remove'
                }
            },
            de: {
                roles: 'Rollen',
                length: 'Wert ist zu lang',
                valueWrong: 'Fehlerhafte Eingabe',
                hasUser: 'Du kannst eine Rolle nicht entfernen, wenn sie noch jemandem oder einer Einladung zugewiesen ist.',
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
