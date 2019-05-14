<template>
    <v-form v-model="isValid" ref="formData">
        <v-card>
            <v-card-title class="pt-0 pb-0">
                <h1 class="headline primary--text pt-3">{{ $t('users') }}</h1>
                <v-spacer></v-spacer>
                <Invite />
            </v-card-title>

            <v-card-text class="pt-0">
                <v-text-field v-model="search" append-icon="search" :label="$t('search')" single-line hide-details></v-text-field>
            </v-card-text>

            <v-data-table :loading="loading.users" :headers="headers" :items="userList" :pagination.sync="pagination" :search="search">
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:items="props">

                    <td :class="{'error': !props.item.firstname.length}">
                        <v-edit-dialog :return-value.sync="props.item.firstname" @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>
                            {{ props.item.firstname }}
                            <template v-slot:input>
                                <v-text-field v-model="props.item.firstname" :rules="[minChars]"></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </td>

                    <td :class="{'error': !props.item.lastname.length}">
                        <v-edit-dialog :return-value.sync="props.item.lastname" @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>
                            {{ props.item.lastname }}
                            <template v-slot:input>
                                <v-text-field v-model="props.item.lastname" :rules="[minChars]"></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </td>

                    <td :class="{'error': !props.item.nickname.length || props.item.nickname.length > 10}">
                        <v-edit-dialog :return-value.sync="props.item.nickname" @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>
                            {{ props.item.nickname }}
                            <template v-slot:input>
                                <v-text-field v-model="props.item.nickname" :rules="[maxChars, minChars]" counter="10"></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </td>

                    <td>
                        <v-edit-dialog @save="close(props.item)" :saveText="$t('btn.save')" :cancelText="$t('btn.cancel')" large lazy>

                            <span v-if="loading.roles" class="spinning-loader">
                                <v-icon light>cached</v-icon>
                            </span>
                            {{ (getGroup(props.item.role))['title'] }}

                            <template v-slot:input>
                                <v-select v-model="props.item.role" :items="roleItems" item-text="title" item-value="id" aria-label="Roles"></v-select>
                            </template>

                        </v-edit-dialog>
                    </td>

                </template>
            </v-data-table>
        </v-card>
    </v-form>
</template>

<script>
import Invite from '@/components/Settings/Invite'

export default {
    name: 'Users',

    components: {
        Invite
    },

    data () {
        return {
            search: '',
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
            if (this.$store.state.app.roles.length) return this.$store.state.app.roles
            return false
        },

        // Table-headers
        headers () {
            return [{
                text: this.$t('user.firstname'),
                value: 'firstname'
            },
            {
                text: this.$t('user.lastname'),
                value: 'lastname'
            },
            {
                text: this.$t('user.nickname'),
                value: 'nickname'
            },
            {
                text: this.$t('user.role'),
                value: 'role'
            }
            ]
        },

        // Return list of users
        userList () {
            return this.$store.state.app.users
        }

    },

    methods: {

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
            if (!vm.$data.isValid) {
                vm.$notify({
                    type: 'error',
                    text: vm.$t('valueWrong')
                })
            } else {
                vm.$http.post('user/edit/', item).then(function (response) {
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

        // Get users from store or api
        if (!vm.$store.state.app.users.length) {
            vm.$http.get('user/read/').then(function (response) {
                vm.$store.state.app.users = response.data.content
            }).catch(function () {
                vm.$notify({
                    type: 'error',
                    text: vm.$t('alert.loadFail')
                })
            })
        }

        // Get available roles of team
        vm.$http.get('role/read/').then(function (response) {
            if (response.data.content) vm.$store.state.app.roles = response.data.content
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
                users: 'Users',
                search: 'Search Names',
                length: 'Value is too long',
                valueWrong: 'Invalid value set',
                user: {
                    firstname: 'Firstname',
                    lastname: 'Lastname',
                    nickname: 'Nickname',
                    role: 'Role'
                }
            },
            de: {
                users: 'Benutzer',
                search: 'Namen suchen',
                length: 'Wert ist zu lang',
                valueWrong: 'Fehlerhafte Eingabe',
                user: {
                    firstname: 'Vorname',
                    lastname: 'Nachname',
                    nickname: 'Nickname',
                    role: 'Rolle'
                }
            }
        }
    }

}
</script>
