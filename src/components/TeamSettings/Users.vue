<template>
    <v-flex xs12 class="pt-1">
        <v-card>

            <v-card-text class="pt-0">
                <v-text-field v-model="search" append-icon="search" :label="$t('search')" single-line hide-details></v-text-field>
            </v-card-text>

            <v-form v-model="isValid" ref="formData">
                <v-data-table :loading="loading.users" :headers="headers" :items="userList" :pagination.sync="pagination" :search="search">
                    <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                    <template v-slot:items="props">

                        <td>
                            <v-icon small v-if="props.item.owner">my_location</v-icon>
                            {{ props.item.firstname }} {{ props.item.lastname }} ({{ props.item.nickname }})
                        </td>

                        <td>
                            <v-edit-dialog @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>
                                <span v-if="loading.roles" class="spinning-loader">
                                    <v-icon light>cached</v-icon>
                                </span>

                                <v-chip class="clickable" v-if="!props.item.owner">
                                    {{ (getGroup(props.item.role))['title'] }}
                                </v-chip>
                                <span v-else>
                                    {{ (getGroup(props.item.role))['title'] }}
                                </span>
                                <template v-slot:input>
                                    <v-select :disabled="props.item.owner" v-model="props.item.role" :items="roleItems" item-text="title" item-value="id" aria-label="Roles"></v-select>
                                </template>
                            </v-edit-dialog>
                        </td>

                        <td class="text-xs-right">
                            <v-btn v-if="!props.item.owner" @click="deleteUser = props.item.id; youSure = true" :disabled="props.item.id == $store.state.user.id" flat icon>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </td>

                    </template>
                </v-data-table>
            </v-form>

            <v-dialog persistent v-model="youSure" max-width="700">
                <v-card>
                    <v-card-title class="headline">{{ $t('yousure.title') }}</v-card-title>
                    <v-card-text>
                        {{ $t('yousure.text') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs12 md4 pa-2>
                                <v-btn block aria-label="cancel" @click="youSure = false" outline>
                                    {{ $t('yousure.stop') }}
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 md8 pa-2>
                                <v-btn block aria-label="accept" @click="removeUser()" color="warning">
                                    {{ $t('yousure.accept') }}
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'Users',

    data () {
        return {
            search: '',
            pagination: {
                rowsPerPage: 10
            },
            minChars: v => v.length >= 1 || this.$t('alert.require'),
            maxChars: v => v.length < 11 || this.$t('length'),
            isValid: false,
            deleteUser: null,
            youSure: false,
            roleList: []
        }
    },

    computed: {

        // To see if data is loaded
        loading () {
            var vm = this
            var users = true
            var roles = true
            if (vm.$store.state.data.users.length) users = false
            if (vm.roleItems) roles = false
            return {
                users: users,
                roles: roles
            }
        },

        // Return list for select
        roleItems () {
            if (this.$store.state.data.roles.length) return this.$store.state.data.roles
            return false
        },

        // Table-headers
        headers () {
            return [{
                text: this.$t('user.name'),
                value: 'firstname'
            },
            {
                text: this.$t('user.role'),
                value: 'role'
            },
            {
                text: this.$t('user.remove'),
                align: 'right',
                sortable: false,
                value: ''
            }
            ]
        },

        // Return list of users
        userList () {
            return this.$store.state.data.users
        }

    },

    methods: {

        removeUser () {
            var vm = this
            if (vm.deleteUser === vm.$store.state.user.id) return false
            vm.$http.post('team/leave/', { user: vm.deleteUser }).then(function (response) {
                var str = vm.$store.state.data.users
                for (var i = 0; i < str.length; i++) {
                    if (str[i].id === vm.deleteUser) str.splice(i, 1)
                }
                vm.youSure = false
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        },

        // Get group by ID
        getGroup (id) {
            if (!this.roleItems) {
                return {
                    title: ''
                }
            }
            for (var i = 0; i < this.roleItems.length; i++) {
                if (this.roleItems[i].id === id) return this.roleItems[i]
            }
        },

        // Save changes and close dialog
        close (item) {
            var vm = this
            vm.$refs.formData.validate()
            if (!vm.isValid) vm.$notify({ type: 'error', text: vm.$t('valueWrong') })
            else {
                vm.$http.post('user/edit/admin/', item).then(function (response) {
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                    if (item.id === vm.$store.state.user.id) vm.$store.commit('login', response.data.content)
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                })
            }
        }

    },

    mounted () {
        var vm = this

        // Get users from store or api
        if (!vm.$store.state.data.users.length) {
            vm.$http.get('user/read/').then(function (response) {
                vm.$store.state.data.users = response.data.content
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
            })
        }

        // Get available roles of team
        vm.$http.get('role/read/').then(function (response) {
            if (response.data.content) vm.$store.state.data.roles = response.data.content
            else vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
        }).catch(function () {
            vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
        })
    },

    i18n: {
        messages: {
            en: {
                users: 'Users',
                search: 'Search Names',
                length: 'Value is too long',
                valueWrong: 'Invalid value set',
                user: {
                    name: 'Name',
                    role: 'Role',
                    remove: 'Remove'
                },
                yousure: {
                    title: 'Are you sure about that?',
                    text: 'Deleting this User will delete all his assignments too, so you will have to do everything again if you add the user in future.',
                    accept: 'I know, delete this User',
                    stop: 'Cancel deletion'
                },
                owner: 'Owner'
            },
            de: {
                users: 'Benutzer',
                search: 'Namen suchen',
                length: 'Wert ist zu lang',
                valueWrong: 'Fehlerhafte Eingabe',
                user: {
                    name: 'Name',
                    role: 'Rolle',
                    remove: 'Entfernen'
                },
                yousure: {
                    title: 'Bist du dir sicher?',
                    text: 'Das löschen von diesem Benutzer wird all seine bestehenden Einsätzen entfernen, wodurch alles neu eingetragen werden müsste, wenn der Benutzer wieder dem Team beitritt.',
                    accept: 'Ich weiss, lösche den Benutzer',
                    stop: 'Löschen abbrechen'
                },
                owner: 'Inhaber'
            }
        }
    }

}
</script>
