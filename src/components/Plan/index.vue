<template>
    <v-layout row wrap>

        <v-flex xs12 v-if="$store.state.app.shifts" class="pa-2 text-xs-center">
            <v-chip v-for="shift in $store.state.app.shifts" :key="shift.id">
                <v-avatar :style="{ backgroundColor: shift.color}"></v-avatar>
                <span>{{shift.title}}</span>
            </v-chip>
        </v-flex>

        <v-dialog v-model="loading" persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    {{ $t('load') }}
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <AssignDialog :show="dialog" :content="inEdit" @close="dialog = false" />

        <div class="scroller" id="head" @scroll.passive="scroller($event.target.scrollLeft, 'head')">
            <table class="scroll-table">
                <HeaderRow :hrc="uow" />
            </table>
        </div>

        <div class="scroller" id="user" @scroll.passive="scroller($event.target.scrollLeft, 'user')">
            <table class="scroll-table">
                <UserRow v-for="u in userList" :key="u.id" :usr="u" :prc="uow" @assign="doEdit" />
            </table>
        </div>

    </v-layout>
</template>

<script>
import AssignDialog from '@/components/Plan/AssignDialog'
import HeaderRow from '@/components/Plan/HeaderRow'
import UserRow from '@/components/Plan/UserRow'
import(/* webpackPrefetch: true */ '@/assets/css/plan.css')

export default {
    name: 'PlanBase',

    components: {
        HeaderRow, UserRow, AssignDialog
    },

    data () {
        return {
            loading: true,
            dialog: false,
            inEdit: {},
            scrollPos: 0
        }
    },

    props: {
        startDate: String,
        endDate: String,
        weekends: Boolean
    },

    computed: {

        // Create Store-Element for assignments of each user and return list
        userList () {
            var vm = this; var users = vm.$store.state.app.users
            if (!users.length) return []

            users.forEach(function (user) {
                vm.$store.state.app.assigns = Object.assign({},
                    vm.$store.state.app.assigns, { [user.id]: [] }
                )
            })

            return users
        },

        // Create a list of dates regarding the users selection
        uow () {
            var beginDate = new Date(this.startDate); var endDate = new Date(this.endDate)
            var currentDate = beginDate; var tmpWeek = this.getWeek(currentDate)
            var dates = []; var weeks = []; var i = 0

            /* eslint-disable no-unmodified-loop-condition, no-mixed-operators */
            while (currentDate <= endDate) {
                var tmpDate = {
                    date: new Date(currentDate),
                    day: currentDate.getDay(),
                    short: currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.',
                    shorter: currentDate.getDate()
                }

                if (tmpWeek !== this.getWeek(currentDate)) {
                    if (i > 0) {
                        weeks.push({
                            week: tmpWeek, days: i
                        })
                    }
                    tmpWeek = this.getWeek(currentDate)
                    i = 0
                }

                if (this.weekends || tmpDate.day !== 6 && tmpDate.day !== 0) {
                    dates.push(tmpDate)
                    i++
                }

                currentDate.setDate(currentDate.getDate() + 1)
            }
            /* eslint-enable no-unmodified-loop-condition, no-mixed-operators */

            if (i > 0) {
                weeks.push({
                    week: tmpWeek, days: i
                })
            }

            var today = new Date(); var todayShort = today.getDate() + '.' + (today.getMonth() + 1) + '.'
            var currentWeek = this.getWeek(today)

            return {
                weeks: weeks,
                dates: dates,
                today: {
                    date: today,
                    short: todayShort,
                    week: currentWeek
                }
            }
        }

    },

    methods: {

        // Get Week-Number of specific Date d
        getWeek (d) {
            /* eslint-disable no-mixed-operators */
            var date = new Date(d.getTime())
            date.setHours(0, 0, 0, 0)
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
            var week1 = new Date(date.getFullYear(), 0, 4)
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
            /* eslint-enable no-mixed-operators */
        },

        // Open the Assignments dialog
        doEdit (select) {
            var format = new Date(select.date)
            select.dateFull = select.date
            select.date = format.getFullYear() + '/' + (format.getMonth() + 1) + '/' + format.getDate()
            this.inEdit = select
            this.dialog = true
        },

        // Syncronize scrolling of header- and user-table
        scroller (count, part) {
            if (count !== this.scrollPos) {
                if (part === 'head') document.getElementById('user').scrollLeft = count + 3
                else document.getElementById('head').scrollLeft = count - 3
                this.scrollPos = count
            }
        }

    },

    mounted () {
        var vm = this

        // Get shifts if not in store
        if (!vm.$store.state.app.shifts.length) {
            vm.$http.get('shift/read/').then(function (response) {
                if (response.data.content) vm.$store.state.app.shifts = response.data.content
            })
        }

        // Get times if not in store
        if (!vm.$store.state.app.times.length) {
            vm.$http.get('daytime/read/').then(function (response) {
                if (response.data.content) vm.$store.state.app.times = response.data.content
            })
        }

        // Get users if not in store
        if (!vm.$store.state.app.users.length) {
            vm.$http.post('user/read/').then(function (response) {
                if (response.data.content) vm.$store.state.app.users = response.data.content
                vm.loading = false
            })
        } else vm.loading = false
    },

    i18n: {
        messages: {
            en: {
                load: 'Loading data...'
            },
            de: {
                load: 'Daten werden geladen...'
            }
        }
    }

}
</script>
