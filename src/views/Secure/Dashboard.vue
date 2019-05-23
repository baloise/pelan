<template>
    <v-container fill-height :class="{'pl-0 pr-0':$vuetify.breakpoint.xsOnly}">
        <v-layout row wrap v-if="$store.state.user.team">

            <v-flex xs12 class="text-xs-center">
                <h1 class="display-1 accent--text">{{ $t('views.dashboard') }}</h1>
                <h1 class="title">{{ call }}</h1>
            </v-flex>

            <v-flex xs12 sm6 class="pa-2" v-if="assigns">
                <h1 class="headline primary--text pl-2 pt-2">{{ $t('shifts') }}</h1>
                <v-divider></v-divider>
                <v-timeline dense large>
                    <v-timeline-item v-for="a in assigns" :key="a.time.id" :color="a.shift.color" :icon="a.icon" fill-dot>
                        <v-card>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs8>
                                        <h2 v-if="a.shift" class="title">{{ a.shift.title }}</h2>
                                        <span v-if="a.note">{{ a.note }}</span>
                                    </v-flex>
                                    <v-flex xs4 class="text-xs-right">
                                        <span>{{ a.time.title }}</span>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
                <v-divider></v-divider>
            </v-flex>

            <v-flex xs12 sm6 class="pa-2" v-if="notes">
                <h1 class="headline primary--text pl-2 pt-2">{{ $t('notes') }}</h1>
                <v-card>
                    <v-card-text class="pa-0">
                        <div v-for="(n, index) in notes" :key="'fruit-'+index">
                            <p class="pt-2 pl-3 pr-3">{{ n.note }}</p>
                            <v-divider></v-divider>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 md5 v-if="!loading && !assigns" class="pa-3">
                <v-card class="success elevation-0" dark>
                    <v-card-text>
                        <v-layout row wrap align-center>
                            <v-flex xs10 class="body-2">{{ $t('noAssigns') }}</v-flex>
                            <v-flex xs2 class="text-xs-right">
                                <v-icon large>check</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex shrink v-if="loading">
                <span class="spinning-loader">
                    <v-icon light>cached</v-icon>
                </span>
            </v-flex>

            <v-flex shrink v-if="loading" class="pl-2">
                {{ $t('load') }}
            </v-flex>

        </v-layout>

        <v-layout row wrap justify-center v-else>
            <NoTeamDashboard />
        </v-layout>

    </v-container>
</template>

<script>
import NoTeamDashboard from '@/components/NoTeamDashboard'

export default {
    name: 'Dashboard',

    components: {
        NoTeamDashboard
    },

    data () {
        return {
            assignList: [],
            noteList: [],
            loading: true
        }
    },

    computed: {

        notes () {
            var vm = this
            if (!vm.noteList.length) return false
            else {
                return vm.noteList.map(note => {
                    if (note.note.length) return note
                })
            }
        },

        // Get daily assigns with time and shift
        assigns () {
            var vm = this; var assigns = []
            if (!vm.assignList.length || !vm.$store.state.data.times.length || !vm.$store.state.data.shifts.length) return false
            vm.assignList.forEach(function (assign) {
                if (!assign.note && !assign.shift) return false

                var tmp = {
                    time: vm.$store.state.data.times.find(function (time) {
                        return time.id === assign.time
                    })
                }

                if (assign.shift) {
                    tmp.shift = vm.$store.state.data.shifts.find(function (shift) {
                        return shift.id === assign.shift
                    })
                } else {
                    tmp.shift = { color: 'grey' }
                    tmp.icon = 'speaker_notes'
                }

                if (assign.note) tmp.note = assign.note
                assigns.push(tmp)
            })

            if (!assigns.length) return false
            return assigns
        },

        // Use diffrent welcome-text at diffrent times
        call () {
            var hour = (new Date()).getHours()
            var take = 'good.evening'
            if (hour <= 11) take = 'good.morning'
            else if (hour <= 17) take = 'good.noon'
            return this.$t(take, { name: this.$store.state.user.firstname })
        }

    },

    // Get Dashboard-Data from API
    mounted () {
        var vm = this; var today = new Date()

        vm.$http.post('dashboard/read/', {
            date: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
        }).then(function (response) {
            if (response.data.content) {
                var cont = response.data.content
                if (cont.shifts) vm.$store.state.data.shifts = cont.shifts
                if (cont.times) vm.$store.state.data.times = cont.times
                if (cont.assigns) vm.assignList = cont.assigns
                else vm.assignList = []
                if (cont.notes) vm.noteList = cont.notes
                else vm.noteList = []
            }
        }).catch(function () { }).then(function () {
            vm.loading = false
        })
    },

    i18n: {
        messages: {
            en: {
                good: {
                    morning: 'Good morning {name}!',
                    noon: 'Hello {name}!',
                    evening: 'Good evening {name}!'
                },
                load: 'Loading information of the day',
                noAssigns: "You don't have any assignments today",
                notes: 'Notes of the day',
                shifts: "Today's assignments"
            },
            de: {
                good: {
                    morning: 'Guten Morgen {name}!',
                    noon: 'Guten Tag {name}!',
                    evening: 'Guten Abend {name}!'
                },
                noAssigns: 'Du hast heute keine Einsätze',
                notes: 'Notizen des Tages',
                load: 'Informationen zum heutigen Tag werden geladen',
                shifts: 'Heutige Einsätze'
            }
        }
    }

}
</script>
