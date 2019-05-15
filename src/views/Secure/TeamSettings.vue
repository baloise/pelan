<template>
    <v-container fill-height>
        <v-layout row wrap class="pb-3">

            <v-flex xs10>
                <h1 class="headline primary--text pt-3">{{ $t('roles') }}</h1>
            </v-flex>
            <v-flex xs2 class="text-xs-right pr-3">
                <CreateRole />
            </v-flex>
            <Roles />

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs10>
                <h1 class="headline primary--text pt-3">{{ $t('users') }}</h1>
            </v-flex>
            <v-flex xs2 class="text-xs-right pr-3">
                <Invite />
            </v-flex>
            <Users />

        </v-layout>
    </v-container>
</template>

<script>
import Roles from '@/components/TeamSettings/Roles'
import CreateRole from '@/components/TeamSettings/CreateRole'

import Users from '@/components/TeamSettings/Users'
import Invite from '@/components/TeamSettings/Invite'

export default {
    name: 'TeamSettings',

    components: {
        Roles,
        CreateRole,
        Users,
        Invite
    },

    i18n: {
        messages: {
            en: {
                roles: 'Roles',
                users: 'Users'
            },
            de: {
                roles: 'Rollen',
                users: 'Benutzer'
            }
        }
    }

}
</script>
