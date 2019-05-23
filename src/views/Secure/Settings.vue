<template>
    <v-container class="pl-0 pr-0">
        <v-layout row wrap>

            <v-flex xs12 class="pl-2 pr-2">
                <h1 class="headline primary--text pl-2 pb-3">{{ $t('details') }}</h1>
                <Details />
            </v-flex>

            <v-flex xs12 class="mb-4 mt-4">
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 :class="{'pl-3 pr-3':!$vuetify.breakpoint.xsOnly}">
                <v-layout row wrap>
                    <v-flex xs10>
                        <h1 class="headline primary--text pa-2">{{ $t('teams') }}</h1>
                    </v-flex>
                    <v-flex xs2 class="text-xs-right pr-2">
                        <CreateTeam />
                    </v-flex>
                    <Teams />
                </v-layout>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import Details from '@/components/Settings/Details'
import Teams from '@/components/Settings/Teams'
import CreateTeam from '@/components/Settings/CreateTeam'

export default {
    name: 'Settings',

    components: {
        Details,
        Teams,
        CreateTeam
    },

    i18n: {
        messages: {
            en: {
                details: 'Details',
                teams: 'Teams'
            },
            de: {
                details: 'Details',
                teams: 'Teams'
            }
        }
    }

}
</script>
