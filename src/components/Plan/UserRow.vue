<template>
    <tr class="full-table-row">

        <td style="text-align: center; border-right: none">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <span v-on="on">{{usr.nickname}}</span>
                </template>
                <span>{{usr.firstname}} {{usr.lastname}}</span>
            </v-tooltip>
        </td>

        <td class="inner-table">
            <table>
                <tr v-for="time in times" :key="usr.id+time.id">
                    <td class="time-desc">
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <span v-on="on">{{time.title}}</span>
                            </template>
                            <span>{{time.title}}</span>
                        </v-tooltip>
                    </td>
                </tr>
            </table>
        </td>

        <td :colspan="prc.dates.length" class="inner-table">
            <table :class="{ 'loading-table' : !loaded }">

                <tr v-for="times in entries" :key="usr.id+times.tid" v-show="loaded">
                    <td v-for="date in times.dates" :width="prc.colwidth" class="cal-entry">

                    </td>
                </tr>

            </table>
        </td>

    </tr>
</template>

<script>

export default {
    name: 'UserRow',

    props: {
        usr: Object,
        prc: {
            dates: Array,
            colwidth: String,
            autoUpdate: Boolean,
            today: Object
        }
    },

    data () {
        return {
            autoReload: false,
            loaded: false,
            entries: [],
            assigns: this.$store.state.content.assignments[this.usr.id]
        }
    },

    computed: {

        times () {
            var elems = this.$store.state.content.times
            for (var i = 0; i < elems.length; i++) {
                if (elems[i].deleted) {
                    elems.splice(i, 1)
                }
            }
            return elems
        }

    },

    watch: {
        times: function (newVal, oldVal) {
            console.log('times triggerd')
            this.createFields()
        },
        assigns: function (newVal, oldVal) {
            console.log('assigns triggerd')
            this.setAssigns()
        }
    },

    mounted () {
        var vm = this
        vm.getAssigns()
    },

    methods: {

        createFields () {
            var vm = this
            vm.entries = vm.times.map(time => {
                var tmpDates = vm.prc.dates.map(date => {
                    return {
                        date: date.date,
                        assign: null,
                        style: null
                    }
                })
                return {
                    tid: time.id,
                    dates: tmpDates
                }
            })
        },

        setAssigns () {
            var vm = this
            vm.assigns.forEach(function (assign) {
                var time = vm.entries.map(entry => {
                    return entry.tid === assign.time
                })

                console.log(time)
            })
        },

        getAssigns () {
            var vm = this
            vm.loaded = false
            vm.$http.post('assignment/read/', {
                user: vm.usr.id,
                from: vm.prc.dates[0].date,
                to: vm.prc.dates[vm.prc.dates.length - 1].date
            }).then(function (response) {
                vm.$store.state.content.assignments[vm.usr.id] = response.data.content
                vm.assigns = vm.$store.state.content.assignments[vm.usr.id]
            }).catch(function () {}).then(function () {
                vm.loaded = true
            })
        }

    }

}

</script>

<style scoped>

    @keyframes changewidth {
        from {
            width: 98%;
            height: 90%;
        }
        to {
            width: 40%;
            height: 20%;
        }
    }

    .loading-table {
        animation-duration: 1.3s;
        animation-name: changewidth;
        animation-iteration-count: 10;
        animation-direction: alternate;
        max-width: 98%;
        max-height: 90%;
        background-color: #f4f4f4;
        margin-right: auto;
        margin-left: auto;
        border: solid 1px f4f4f4;
        border-radius: 20px;
    }

    .time-desc{
        overflow-x: hidden;
        overflow-y: hidden;
        max-width: 50px;
    }

    .inner-table {
        padding: 0px;
        border: none;
    }

    .full-table-row {
        border-bottom: solid 2px #e6e6e6;
        border-top: solid 2px #e6e6e6;
    }

    .full-table-row:hover {
        background-color: #f1f1f1;
    }

    .inner-table table {
        height: 100%;
        width: 100%;
    }

    .inner-table td {
        text-align: center;
        padding-top: 2px;
        padding-bottom: 2px;
    }

    .cal-entry {
        min-height: 100%;
        cursor: pointer;
        border-radius:5px;
    }

    .cal-entry:hover {
        -webkit-box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.5);
        box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.5);
    }

    td, th {
        border: 0.5px solid #e6e6e6;
        border-radius: 0px;
        text-align: left;
        padding: 8px;
    }

</style>
