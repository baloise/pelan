<template>
    <v-layout row wrap>
        <v-flex xs12>

            <v-form v-model="isValid" ref="formData">
                <v-data-table :loading="isLoading" :headers="headers" :items="userList" :pagination.sync="pagination">
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
                                {{ (getGroup(props.item.role))['text'] }}
                                <template v-slot:input>
                                    <v-select v-model="props.item.role" :items="groupItems" item-text="text" item-value="id"></v-select>
                                </template>
                            </v-edit-dialog>
                        </td>
                    </template>
                </v-data-table>
            </v-form>

        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'Users',

    i18n: {
        messages: {
            en: {
                length: 'Value is too long',
                valueWrong: 'Invalid value set',
                useredits: 'Edit Users',
                user: {
                    firstname: 'Firstname',
                    lastname: 'Lastname',
                    nickname: 'Nickname',
                    role: 'Role'
                },
                btn: {
                    save: 'Save',
                    cancel: 'Cancel'
                }
            },
            de: {
                length: 'Wert ist zu lang',
                valueWrong: 'Fehlerhafte Eingabe',
                useredits: 'Benutzer anpassen',
                user: {
                    firstname: 'Vorname',
                    lastname: 'Nachname',
                    nickname: 'Nickname',
                    role: 'Rolle'
                },
                btn: {
                    save: 'Speichern',
                    cancel: 'Abbrechen'
                }
            }
        }
    },

    data () {
        return {
            pagination: { rowsPerPage: 10 },
            minChars: v => v.length >= 1 || this.$t('alert.require'),
            maxChars: v => v.length < 11 || this.$t('length'),
            isValid: false,
            isLoading: false,

            // TODO get from api
            groupItems: [
                { id: '1', text: 'Teamleiter', admin: 1 },
                { id: '2', text: 'Mitglied', admin: 0 }
            ]

        }
    },

    computed: {
        headers () {
            return [
                { text: this.$t('user.firstname'), value: 'firstname' },
                { text: this.$t('user.lastname'), value: 'lastname' },
                { text: this.$t('user.nickname'), value: 'nickname' },
                { text: this.$t('user.role'), value: 'role' }
            ]
        },
        userList () {
            return this.$store.state.content.users
        }
    },

    mounted () {
        var vm = this

        // Get users from store or api
        if (!vm.$store.state.content.users.length) {
            vm.isLoading = true
            vm.$http.get('user/read/').then(function (response) {
                vm.$store.state.content.users = response.data.content
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
            }).then(function () {
                vm.isLoading = false
            })
        }
    },

    methods: {

        // Get group by ID
        getGroup (id) {
            for (var i = 0; i < this.groupItems.length; i++) {
                if (this.groupItems[i].id === id) {
                    return this.groupItems[i]
                }
            }
        },

        // Save changes and close dialog
        close (item) {
            var vm = this
            vm.$refs.formData.validate()
            if (!vm.$data.isValid) {
                vm.$notify({ type: 'error', text: vm.$t('valueWrong') })
            } else {
                vm.$http.post('user/edit/', {
                    id: item.id,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    nickname: item.nickname,
                    language: item.language,
                    role: item.role
                }).then(function (response) {
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                    if (item.id === vm.$store.state.user.id) {
                        vm.$store.commit('login')
                        vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + vm.$store.state.auth.token
                    }
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                })
            }
        }

    }

}
</script>
