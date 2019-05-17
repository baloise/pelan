<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" max-width="600px">

        <template v-slot:activator="{ on }">
            <v-card>
                <v-card-text>
                    <v-layout row wrap align-center justify-center>
                        <v-flex xs10>
                            <span class="caption">{{ $t('ft.owner') }}</span><br />
                            <span class="">{{ ownerName }}</span>
                        </v-flex>
                        <v-flex xs2 class="text-xs-right">
                            <v-btn icon small flat v-on="on" :disabled="$store.state.user.team.owner.id !== $store.state.user.id">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </template>

        <v-card v-if="$store.state.user.team.owner.id === $store.state.user.id && admins">

            <v-card-title>
                <h1 class="title primary--text">{{ $t('change') }}</h1>
            </v-card-title>
            <v-radio-group v-model="fd.owner">
                <v-card-text @click="change = true">
                    {{ $t('note') }}
                    <v-layout v-for="admin in admins" :key="admin.id" row wrap align-center justify-center>
                        <v-flex xs12 class="pt-2 pb-1">
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs2 class="pa-2" @click="fd.owner = admin.id">
                            <v-radio :value="admin.id" color="primary" class="pl-4" />
                        </v-flex>
                        <v-flex xs10 @click="fd.owner = admin.id">
                            <span class="caption">{{ $t('ft.name') }}</span><br />
                            <span class="">{{ admin.firstname }} {{ admin.lastname }}</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-radio-group>

            <v-card-actions>
                <v-layout row wrap align-center justify-center>
                    <v-flex xs12 sm6 class="pa-2">
                        <v-btn flat block @click="show = false">
                            {{ $t('btn.cancel') }}
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 class="pa-2">
                        <v-btn block color="primary" @click="saveChange()" :disabled="!change || sending" :loading="sending">
                            {{ $t('change') }}
                            <span slot="loader" class="spinning-loader">
                                <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>

export default {
    name: 'CreateRole',

    data () {
        return {
            show: false,
            change: false,
            sending: false,
            fd: {
                owner: null
            },
            ownerName: this.$store.state.user.team.owner.name
        }
    },

    computed: {

        admins () {
            var vm = this; var adminList = []
            vm.$store.state.data.users.forEach(user => {
                if (user.id === vm.$store.state.user.id) return false
                if (vm.$store.state.data.roles.find(role => {
                    if (role.id === user.role && role.admin) return true
                })) adminList.push(user)
            })
            return adminList
        }

    },

    methods: {

        saveChange () {
            var vm = this
            if (!vm.fd.owner) return false
            vm.sending = true
            vm.$http.post('team/edit/owner/', vm.fd).then(function (response) {
                vm.$store.commit('login')
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            }).then(function () {
                vm.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                change: 'Change Owner',
                note: "You can only select a user with existing admin-permissions. If you change the owner of this team you won't be able to change it back again. Only the owner can delete his team."
            },
            de: {
                change: 'Inhaber wechseln',
                note: 'Du kannst nur einen Benutzer wählen, der bereits Admin-Berechtigungen besitzt. Wenn du den Inhaber dieses Teams änderst kannst du dies nicht mehr rückgängig machen. Nur der Inhaber kann das Team löschen.'
            }
        }
    }

}
</script>
