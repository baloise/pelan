<template>
    <v-container fluid class="pa-0">

        <v-layout row wrap v-if="info && !$store.state.app.denseBar" class="pt-0 pb-2">

            <v-flex xs12 md10 v-if="$store.state.data.shifts" class="pa-2 text-xs-center text-md-left">
                <v-chip v-for="shift in $store.state.data.shifts" :key="shift.id">
                    <v-avatar :style="{ backgroundColor: shift.color}"></v-avatar>
                    <span>{{shift.title}}</span>
                </v-chip>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex xs12 md2 class="pt-1 text-xs-center text-md-left">
                <v-btn flat class="title text-capitalize" @click.stop="filter.show = true">
                    <span class="title">{{dt.select}}</span>
                    <v-icon right>edit</v-icon>
                </v-btn>
            </v-flex>

            <DateSelection v-model="filter"/>

            <v-flex xs12>
                <v-divider></v-divider>
            </v-flex>

        </v-layout>

        <PlanBase :startDate="dt.start" :endDate="dt.end" :weekends="filter.weekends" />

    </v-container>
</template>

<script>
import PlanBase from '@/components/Plan/'
import DateSelection from '@/components/Plan/DateSelection'

export default {
    name: 'Plan',

    components: {
        PlanBase, DateSelection
    },

    data () {
        return {
            info: true,
            filter: {
                show: false,
                weekends: false,
                picked: new Date()
            }
        }
    },

    computed: {

        // Format dates for plan-table
        dt () {
            var vm = this; var pick = vm.filter.picked
            var last = new Date(pick.getFullYear(), pick.getMonth() + 1, 0)
            return {
                select: vm.$t('months.' + (pick.getMonth() + 1)) + ' ' + pick.getFullYear(),
                start: pick.getFullYear() + '/' + (pick.getMonth() + 1) + '/' + pick.getDate(),
                end: last.getFullYear() + '/' + (last.getMonth() + 1) + '/' + last.getDate()
            }
        }

    },

    i18n: {
        messages: {
            en: {
                months: {
                    1: 'January',
                    2: 'February',
                    3: 'March',
                    4: 'April',
                    5: 'May',
                    6: 'June',
                    7: 'July',
                    8: 'August',
                    9: 'September',
                    10: 'October',
                    11: 'November',
                    12: 'December'
                }
            },
            de: {
                months: {
                    1: 'Januar',
                    2: 'Februar',
                    3: 'März',
                    4: 'April',
                    5: 'Mai',
                    6: 'Juni',
                    7: 'Juli',
                    8: 'August',
                    9: 'September',
                    10: 'Oktober',
                    11: 'November',
                    12: 'Dezember'
                }
            }
        }
    }

}
</script>
