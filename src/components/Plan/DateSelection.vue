<template>
    <v-dialog v-model="value.show" max-width="500">
        <v-card>
            <v-card-title class="headline">Filter</v-card-title>
            <v-card-text>
                <v-flex xs12>
                    <v-menu v-model="pickMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field :value="selected" :label="$t('month')" append-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker :locale="$store.state.user.language" v-model="value.pickMonth" @input="pickMenu = false" type="month" color="primary"></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex xs12>
                    <v-checkbox v-model="value.weekends" color="primary" :label="$t('weekends')"></v-checkbox>
                </v-flex>

                <v-flex xs12>
                    <v-checkbox v-model="value.autoUpdate" color="primary" :label="$t('autoupdate')"></v-checkbox>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="value.show = false">
                    {{ $t('close') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DateSelection',
    props: ['value'],

    data () {
        return {
            pickMenu: false
        }
    },

    methods: {

        wat (ele) {
            console.log(ele)
        }

    },

    computed: {

        selected () {
            var date = new Date(this.value.pickMonth + '-1')
            return this.$t('months.' + (date.getMonth() + 1)) + ' ' + date.getFullYear()
        }

    },

    i18n: {
        messages: {
            en: {
                month: 'Month',
                weekends: 'Weekends',
                autoupdate: 'Update automaticly',
                close: 'Close',
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
                month: 'Monat',
                weekends: 'Wochenenden',
                autoupdate: 'Automatisch aktualisieren',
                close: 'Schliessen',
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

<style scoped>
    .clickable {
        cursor: pointer;
    }
    .plan-container {
        overflow-y: hidden;
        overflow-x: scroll;
        display: absolute;
    }
    .plan-inner {
        min-width: 1000px;
    }
</style>
