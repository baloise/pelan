<template>
    <v-container class="pl-0 pr-0">
        <v-layout row wrap>

            <v-flex xs12 class="pl-3 pr-3">
                <v-layout row wrap>

                    <v-flex xs12 sm6>
                        <h1 class="headline primary--text pt-3">{{ $t('detail') }}</h1>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <OwnerChange />
                    </v-flex>
                    <v-flex xs12>
                        <Details />
                    </v-flex>

                </v-layout>
            </v-flex>

            <v-flex xs12 class="mb-4 mt-4">
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 class="pl-3 pr-3">
                <v-layout row wrap>

                    <v-flex xs10>
                        <h1 class="headline primary--text pt-3">{{ $t('roles') }}</h1>
                    </v-flex>
                    <v-flex xs2 class="text-xs-right pr-3">
                        <CreateRole />
                    </v-flex>
                    <Roles />

                </v-layout>
            </v-flex>

            <v-flex xs12 class="mb-4 mt-4">
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 class="pl-3 pr-3">
                <v-layout row wrap>

                    <v-flex xs10>
                        <h1 class="headline primary--text pt-3">{{ $t('users') }}</h1>
                    </v-flex>
                    <v-flex xs2 class="text-xs-right pr-3">
                        <Invite />
                    </v-flex>
                    <Users />

                </v-layout>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import OwnerChange from '@/components/TeamSettings/OwnerChange'
import Details from '@/components/TeamSettings/Details'

import Roles from '@/components/TeamSettings/Roles'
import CreateRole from '@/components/TeamSettings/CreateRole'

import Users from '@/components/TeamSettings/Users'
import Invite from '@/components/TeamSettings/Invite'

export default {
    name: 'TeamSettings',

    components: {
        OwnerChange,
        Details,
        Roles,
        CreateRole,
        Users,
        Invite
    },

    i18n: {
        messages: {
            en: {
                detail: 'Details',
                roles: 'Roles',
                users: 'Users'
            },
            de: {
                detail: 'Details',
                roles: 'Rollen',
                users: 'Benutzer'
            }
        }
    }

}
</script>
