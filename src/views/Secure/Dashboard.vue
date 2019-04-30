<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>
                <h1 class="display-1 accent--text">{{ $t('views.dashboard') }}</h1>
                <h1 class="title mb-4">{{ call }}</h1>

                <v-layout row wrap justify-center>

                    <v-flex xs12 md7 :class="style" v-if="assigns">
                        <h1 class="headline primary--text">{{ $t('shifts') }}</h1>
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
                    </v-flex>

                    <v-flex xs12 md5 :class="style" v-if="true">
                        <h1 class="headline primary--text">{{ $t('notes') }}</h1>
                        <v-divider></v-divider>
                        <v-card class="mt-4 fill-height">
                            <v-card-text>
                                <ul>
                                    <li>Test1</li>
                                    <li>Test1</li>
                                    <li>Test1</li>
                                    <li>Test1</li>
                                    <li>Test1</li>
                                    <li>Test1</li>
                                    <li>Test1</li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs12 md5 v-if="!assigns" class="pa-5">
                        <v-card class="success elevation-0" dark>
                            <v-card-text>
                                <v-layout row wrap align-center>
                                    <v-flex xs10 class="body-2">{{ $t('noAssigns') }}</v-flex>
                                    <v-flex xs2 class="text-xs-right"><v-icon large>check</v-icon></v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Dashboard',

    data () {
        return {
            assignList: []
        }
    },

    computed: {

        // Get daily assigns with time and shift
        assigns () {
            var vm = this
            var assigns = []
            if (!this.assignList.length || !vm.$store.state.app.times.length || !vm.$store.state.app.shifts.length) return false

            vm.assignList.forEach(function (assign) {
                if (!assign.note && !assign.shift) return false

                var tmp = {
                    time: vm.$store.state.app.times.find(function (time) {
                        return time.id === assign.time
                    })
                }

                if (assign.shift) {
                    tmp.shift = vm.$store.state.app.shifts.find(function (shift) {
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

        // Style elements responsive
        style () {
            return {
                'pb-1 pt-1': this.$vuetify.breakpoint.xsOnly,
                'pa-2': !this.$vuetify.breakpoint.xsOnly
            }
        },

        // Use diffrent welcome-text at diffrent times
        call () {
            var hour = (new Date()).getHours()
            var take = 'good.evening'
            if (hour <= 11) take = 'good.morning'
            else if (hour <= 17) take = 'good.noon'
            return this.$t(take, {
                name: this.$store.state.user.firstname
            })
        }

    },

    mounted () {
        var vm = this
        var today = new Date()
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()

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

        // Get assignments of the day
        vm.$http.post('assignment/read/', {
            user: vm.$store.state.user.id,
            from: date,
            to: date
        }).then(function (response) {
            if (response.data.content) vm.assignList = response.data.content
            else vm.assignList = []
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
                shifts: 'Deine heutigen Einsätze'
            }
        }
    }

}
</script>
