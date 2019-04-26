<template>
    <tr>
        <th min-width="50px" v-for="date in dates" :key="date.short" :style="useStyle(date.day)">
            {{ $t('weekdays.'+date.day) }}<br />
            {{ date.short }}
        </th>
    </tr>
</template>

<script>
export default {
    name: 'HeaderDates',
    props: ['dates'],
    methods: {
        useStyle (day) {
            if (day === 1) {
                return 'backgroundColor: #dddddd' // + this.$vuetify.theme.secondary
            }
        }
    },
    i18n: {
        messages: {
            en: {
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

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center;
    overflow: hidden;
}

</style>
