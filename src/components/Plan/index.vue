<template>
    <v-layout row wrap>

        <v-flex xs12 v-if="$store.state.content.shifts" class="pa-3">
            <v-chip v-for="shift in $store.state.content.shifts" :key="shift.id">
                <v-avatar v-bind:style="{ backgroundColor: shift.color}"></v-avatar>
                {{shift.title}}
            </v-chip>
        </v-flex>

        <table class="plan-table">

            <tr>
                <td width="160px" rowspan="2" colspan="2" class="text-xs-right">
                    {{ $t('week') }}<br /><br />
                    {{ $t('day') }}
                </td>
                <th v-for="week in uRow.weeks" :key="week.name" :colspan="week.days" class="text-xs-center">
                    {{ week.name }}
                </th>
            </tr>

            <HeaderDates :dates="uRow.dates" :colwidth="uRow.colwidth"/>

            <UserRow v-for="user in $store.state.content.users" :key="user.id" :usr="user" :prc="uRow"/>

        </table>

    </v-layout>
</template>

<script>
import HeaderDates from '@/components/Plan/HeaderDates'
import UserRow from '@/components/Plan/UserRow'

export default {
    name: 'PlanBase',

    components: {
        HeaderDates,
        UserRow
    },

    props: {
        startDate: String,
        endDate: String,
        weekends: Boolean,
        autoUpdate: Boolean
    },

    i18n: {
        messages: {
            en: {
                week: 'Week',
                day: 'Day'
            },
            de: {
                week: 'Woche',
                day: 'Tag'
            }
        }
    },

    methods: {

        getWeek (d) {
            var date = new Date(d.getTime())
            date.setHours(0, 0, 0, 0)
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
            var week1 = new Date(date.getFullYear(), 0, 4)
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
        }

    },

    computed: {

        uRow () {
            var beginDate = new Date(this.startDate)
            var endDate = new Date(this.endDate)
            var currentDate = beginDate
            var tmpWeek = this.getWeek(currentDate)
            var width = '50px'
            var dates = []
            var weeks = []
            var i = 0

            while (currentDate <= endDate) {
                var tmpDate = {
                    date: currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate(),
                    short: currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.',
                    day: currentDate.getDay()
                }

                if (tmpWeek !== this.getWeek(currentDate)) {
                    if (i > 0) { weeks.push({ week: tmpWeek, name: tmpWeek, days: i }) }
                    tmpWeek = this.getWeek(currentDate)
                    i = 0
                }

                if (this.weekends || tmpDate.day !== 6 && tmpDate.day !== 0) {
                    dates.push(tmpDate)
                    i++
                }

                currentDate.setDate(currentDate.getDate() + 1)
            }

            if (i > 0) {
                weeks.push({ week: tmpWeek, name: tmpWeek, days: i })
            }

            return {
                colwidth: width,
                weeks: weeks,
                dates: dates,
                today: new Date()
            }
        }

    },

    mounted () {
        var vm = this

        // Get shifts if not in store
        if (!vm.$store.state.content.shifts.length) {
            vm.$http.get('shift/read/').then(function (response) {
                if (response.data.content) { vm.$store.state.content.shifts = response.data.content }
            })
        }

        // Get users if not in store
        if (!vm.$store.state.content.users.length) {
            vm.$http.post('user/read/').then(function (response) {
                if (response.data.content) {
                    vm.$store.state.content.users = response.data.content
                }
            })
        }

        // Get times if not in store
        if (!vm.$store.state.content.times.length) {
            vm.$http.get('daytime/read/').then(function (response) {
                if (response.data.content) { vm.$store.state.content.times = response.data.content }
            })
        }
    }

}

</script>

<style scoped>

    .plan-table {
        table-layout: fixed;
        height: 100%;
        background-color: white;
    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border-right: 0.1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

</style>
