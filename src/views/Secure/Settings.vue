<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>

                <v-layout row wrap>
                    <v-flex xs12 class="pb-4">
                        <h1 class="headline primary--text pt-3">{{ $t('lang') }}</h1>
                        <Language />
                    </v-flex>

                    <v-flex xs12>
                        <v-divider></v-divider>
                    </v-flex>

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
import Language from '@/components/Settings/Language'
import Teams from '@/components/Settings/Teams'
import CreateTeam from '@/components/Settings/CreateTeam'

export default {
    name: 'Settings',

    components: {
        Language,
        Teams,
        CreateTeam
    },

    i18n: {
        messages: {
            en: {
                lang: 'Language',
                teams: 'Teams',
            },
            de: {
                lang: 'Sprache',
                teams: 'Teams',
            }
        }
    }

}
</script>
