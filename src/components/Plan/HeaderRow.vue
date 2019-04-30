<template>
    <tr class="hd-full-row" width="100%">

        <td class="hd-spacer">
            <div class="hd-spacer-inner">
            </div>
        </td>

        <td class="hd-titles">
            <table>
                <tr>
                    <td>
                        <div class="hd-titles-inner caption">
                            <i>{{ $t('week') }}</i>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="hd-titles-inner caption">
                            <i>{{ $t('day') }}</i>
                        </div>
                    </td>
                </tr>
            </table>
        </td>

        <td class="hd-dates caption" width="100%">
            <table width="100%">
                <tr>
                    <td v-for="week in hrc.weeks" :colspan="week.days" :key="week.week">
                        <div :class="weekStyle(week)">
                            {{ week.week }}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td v-for="date in hrc.dates" :key="date.short">
                        <div :class="dayStyle(date)">
                            {{ $t('weekdays.'+date.day) }}<br />
                            {{ date.shorter }}
                        </div>
                    </td>
                </tr>
            </table>
        </td>

    </tr>
</template>

<script>
export default {
    name: 'HeaderRow',

    props: {
        hrc: {
            weeks: String,
            dates: Array,
            today: Object
        }
    },

    methods: {

        dayStyle (date) {
            return {
                'hd-day-inner': true,
                'is-monday': date.day === 1,
                'is-current': date.short === this.hrc.today.short
            }
        },

        weekStyle (week) {
            return {
                'hd-week-inner': true,
                'is-current': week.name === this.hrc.today.week
            }
        }

    },

    i18n: {
        messages: {
            en: {
                week: 'Week',
                day: 'Day',
                weekdays: {
                    1: 'Mo',
                    2: 'Tu',
                    3: 'We',
                    4: 'Th',
                    5: 'Fr',
                    6: 'Sa',
                    0: 'Su'
                }
            },
            de: {
                week: 'Woche',
                day: 'Tag',
                weekdays: {
                    1: 'Mo',
                    2: 'Di',
                    3: 'Mi',
                    4: 'Do',
                    5: 'Fr',
                    6: 'Sa',
                    0: 'So'
                }
            }
        }
    }

}
</script>

<style scoped>

    .hd-full-row {
        //border-bottom: solid 2.5px #CCCCCC;
    }

    .hd-titles {
        vertical-align: top;
        text-align: right;
    }

    .hd-spacer-inner {
        width: 60px;
    }

    .hd-day-inner, .hd-week-inner {
        background-color: #E6E6E6;
        border-radius: 10px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 3px;
        text-align: center;
        overflow: hidden;
        padding: 2px 0px 0px 0px;
    }

    .hd-day-inner {
        height: 50px;
        border: solid 1.5px #E6E6E6;
        min-width: 30px;
    }

    .hd-week-inner {
        height: 28px;
        margin-left: 3px;
        margin-right: 3px;
    }

    .hd-titles-inner {
        width: 50px;
        border-left: none;
    }

    .is-monday {
        background-color: #CCCCCC;
        border: solid 1.5px #CCCCCC;
    }

    .is-current {
        background-color: #008AC9;
        border: solid 1.5px #008AC9;
        color: white;
    }

</style>
