<template>
    <v-container fill-height>
        <v-layout row wrap align-center v-if="$store.state.user.role.admin">

            <v-flex xs12>
                <h1 class="headline primary--text">{{ $t('shifts') }}</h1>
                <Shifts/>
            </v-flex>

            <v-flex xs12 class="pa-3">
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12>
                <h1 class="headline primary--text">{{ $t('times') }}</h1>
                <Times/>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import Shifts from '@/components/PlanSettings/Shifts'
import Times from '@/components/PlanSettings/Times'

export default {
    name: 'PlanSettings',

    components: {
        Shifts, Times
    },

    i18n: {
        messages: {
            en: {
                shifts: 'Shifts',
                times: 'Times'
            },
            de: {
                shifts: 'Schichten',
                times: 'Zeiten'
            }
        }
    }

}
</script>
