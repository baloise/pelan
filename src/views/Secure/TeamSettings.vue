<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>

                <v-layout row wrap class="pb-3">
                    <v-flex xs12>
                        <v-card>
                            <Roles />
                            <v-divider></v-divider>
                            <Users/>
                        </v-card>
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Roles from '@/components/Settings/Roles'
import Users from '@/components/Settings/Users'

export default {
    name: 'TeamSettings',

    components: {
        Roles,
        Users
    }

}
</script>
