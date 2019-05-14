<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>

                <h1 class="display-1 accent--text">{{ $t('views.settings') }}</h1>

                <v-layout row wrap class="pa-1">
                    <v-flex xs12>
                        <Language />
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="pa-1">
                    <v-flex xs12>
                        <Roles v-if="$store.state.user.role.admin" />
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="pa-1">
                    <v-flex xs12>
                        <Users v-if="$store.state.user.role.admin" />
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Language from '@/components/Settings/Language'
import Roles from '@/components/Settings/Roles'
import Users from '@/components/Settings/Users'

export default {
    name: 'Settings',

    components: {
        Language, Roles, Users
    }

}
</script>
