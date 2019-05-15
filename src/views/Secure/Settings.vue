<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>

                <v-layout row wrap class="pb-3">
                    <v-flex xs12>
                        <Teams />
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="pb-3">
                    <v-flex xs12>
                        <Language />
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-expansion-panel v-if="$store.state.user.role.admin">
                            <v-expansion-panel-content>
                                <template v-slot:header>
                                    <h1 class="headline primary--text">
                                        {{ $store.state.user.team.title }}
                                        {{ $store.state.user.role.title }}
                                    </h1>
                                </template>
                                <Roles />
                                <v-divider></v-divider>
                                <Users/>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Language from '@/components/Settings/Language'
import Teams from '@/components/Settings/Teams'

import Roles from '@/components/Settings/Roles'
import Users from '@/components/Settings/Users'

export default {
    name: 'Settings',

    components: {
        Language,
        Roles,
        Users,
        Teams
    }

}
</script>
