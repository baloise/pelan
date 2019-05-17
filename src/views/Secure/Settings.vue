<template>
    <v-container class="pl-0 pr-0">
        <v-layout row wrap>

            <v-flex xs12 class="pl-3 pr-3">
                <h1 class="headline primary--text pt-3">{{ $t('details') }}</h1>
                <Details />
            </v-flex>

            <v-flex xs12 class="mb-4 mt-4">
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 class="pl-3 pr-3">
                <v-layout row wrap>
                    <v-flex xs10>
                        <h1 class="headline primary--text pt-3">{{ $t('teams') }}</h1>
                    </v-flex>
                    <v-flex xs2 class="text-xs-right pr-3">
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
