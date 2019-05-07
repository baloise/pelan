<template>
    <tr class="ur-full-row" width="100%">

        <td :class="{'loading-times': !loaded, 'ur-user':loaded}">
            <div class="ur-user-inner">
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="caption">{{usr.nickname}}</span>
                    </template>
                    <span>{{usr.firstname}} {{usr.lastname}}</span>
                </v-tooltip>
            </div>
        </td>

        <td :class="{'loading-times': !loaded, 'ur-times':loaded}">
            <table>
                <tr v-for="time in times" :key="usr.id+time.id">
                    <td>
                        <div class="ur-times-inner">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on" class="caption">{{time.abbreviation}}</span>
                                </template>
                                <span>{{time.title}}</span>
                            </v-tooltip>
                        </div>
                    </td>
                </tr>
            </table>
        </td>

        <td :class="{'loading-times': !loaded, 'ur-assigns':loaded}" width="100%">
            <table width="100%">
                <tr v-for="row in entries" :key="usr.id+row.time.id">
                    <td v-for="date in row.dates" @click="openEdit(date, row.time)" :key="usr.id+row.time+date.date">
                        <div :class="style(date)" :style="date.style">
                            <v-icon v-if="date.note">speaker_notes</v-icon>
                        </div>
                    </td>
                </tr>
            </table>
        </td>

    </tr>
</template>

<script>
export default {
    name: 'UserRow',

    data () {
        return {
            loaded: false,
            entries: false
        }
    },

    props: {
        usr: Object,
        prc: {
            dates: Array, today: Object
        }
    },

    computed: {

        times () {
            if (this.$store.state.app.times.length) return this.$store.state.app.times
            return false
        },

        shifts () {
            if (this.$store.state.app.shifts.length) return this.$store.state.app.shifts
            return false
        },

        assigns () {
            if (this.$store.state.app.assigns[this.usr.id].length) {
                return this.$store.state.app.assigns[this.usr.id]
            }
            return false
        },

        dates () {
            if (this.prc.dates.length) return this.prc.dates
            return false
        }

    },

    methods: {

        // Create Plan-Fields from dates & times + trigger setAssigns()
        createEntries () {
            var vm = this
            if (!vm.times || !vm.dates) return false

            vm.entries = vm.times.map(time => {
                return {
                    time: time,
                    dates: vm.dates.map(date => {
                        return {
                            date: date.date,
                            note: null,
                            shift: null
                        }
                    })
                }
            })
        },

        // Allocate found assigns to generated fields on the plan
        setAssigns () {
            var vm = this

            if (vm.assigns.length === 1 && vm.assigns[0].load) {
                vm.loaded = true
                return false
            }

            if (!vm.entries || !vm.assigns) return false
            vm.assigns.forEach(function (assign) {
                assign.date = new Date(assign.date)
                vm.entries.map(entry => {
                    if (entry.time.id === assign.time) {
                        return entry.dates.map(date => {
                            if (assign.date.getTime() === date.date.getTime()) {
                                date.note = assign.note
                                if (assign.shift) {
                                    var found = vm.shifts.find(function (shift) {
                                        return shift.id === assign.shift
                                    })
                                    if (found) {
                                        date.shift = found
                                        date.style = 'background-color: ' + date.shift.color + ';'
                                        date.style += 'border-color: ' + date.shift.color + ';'
                                    }
                                }
                            }
                        })
                    }
                })
            })
            vm.loaded = true
        },

        // Get Assigns of user from API
        getAssigns () {
            var vm = this
            var dA = vm.prc.dates[0].date
            var dB = vm.prc.dates[vm.prc.dates.length - 1].date
            vm.$store.state.app.assigns[vm.usr.id] = []

            vm.$http.post('assignment/read/', {
                user: vm.usr.id,
                from: dA.getFullYear() + '/' + (dA.getMonth() + 1) + '/' + dA.getDate(),
                to: dB.getFullYear() + '/' + (dB.getMonth() + 1) + '/' + dB.getDate()
            }).then(function (response) {
                if (response.data.content) vm.$store.state.app.assigns[vm.usr.id] = response.data.content
                else vm.$store.state.app.assigns[vm.usr.id] = [{ load: true }]
            })
        },

        // Style Assignment depending on content
        style (date) {
            return {
                'ur-assigns-inner': true,
                'is-monday': date.day === 1,
                'loading-entry': !this.loaded,
                'note-only': date.note && !date.assign
            }
        },

        // Trigger the Assignment-Editor on click
        openEdit (field, tid) {
            if (!this.loaded) return false
            this.$emit('assign', {
                user: this.usr,
                time: tid,
                date: field.date,
                shift: field.shift,
                note: field.note
            })
        }

    },

    mounted () {
        this.createEntries()
        this.getAssigns()
    },

    watch: {

        dates: function (newVal, oldVal) {
            this.createEntries()
            if (newVal[0].date.getTime() !== oldVal[0].date.getTime()) {
                this.loaded = false
                this.getAssigns()
            } else this.setAssigns()
        },

        assigns: function (newVal, oldVal) {
            this.createEntries()
            this.setAssigns()
        },

        shifts: function (newVal, oldVal) {
            this.setAssigns()
        },

        times: function (newVal, oldVal) {
            this.createEntries()
            this.setAssigns()
        }

    }

}
</script>
