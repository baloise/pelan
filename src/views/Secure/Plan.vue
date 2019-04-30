<template>
    <v-container fluid class="pa-0">

        <v-layout row wrap class="pl-3 pr-1 pt-3">

            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <h1 class="display-1 accent--text">{{ $t('views.plan') }}</h1>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex xs12 sm4 class="text-xs-center text-sm-right">
                <v-btn flat class="title text-capitalize" @click.stop="filter.show = true">
                    {{selected}} <v-icon right>edit</v-icon>
                </v-btn>
            </v-flex>

            <DateSelection v-model="filter"/>

        </v-layout>

        <PlanBase :startDate="startDate" :endDate="endDate" :weekends="filter.weekends" />

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
            filter: {
                show: false,
                pickMonth: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
                weekends: false
            }
        }
    },

    computed: {

        selected () {
            var date = new Date(this.filter.pickMonth + '-1')
            return this.$t('months.' + (date.getMonth() + 1)) + ' ' + date.getFullYear()
        },

        startDate () {
            var date = new Date(this.filter.pickMonth + '-1')
            return (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
        },

        endDate () {
            var date = new Date(this.filter.pickMonth + '-1')
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            return (lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getDate())
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
