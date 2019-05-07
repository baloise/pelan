<template>
    <v-dialog v-model="value.show" width="290">
        <v-card>

            <v-card-text class="pa-0">
                <v-date-picker v-model="dateValue" type="month" color="primary" class="elevation-0" :locale="$store.state.user.language"></v-date-picker>
                <v-checkbox v-model="value.weekends" color="primary" :label="$t('weekends')" class="pl-4"></v-checkbox>
            </v-card-text>

            <v-card-actions>
                <v-btn flat @click="value.show = false">
                    {{ $t('btn.close') }}
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DateSelection',

    props: {
        value: Object
    },

    computed: {

        // Format date for v-date-picker
        dateValue: {
            get () {
                var month = this.value.picked.getMonth() + 1
                if (month < 10) month = '0' + month
                return this.value.picked.getFullYear() + '-' + month
            },
            set (val) {
                var vm = this; var format = new Date(val)
                vm.$emit('input', {
                    picked: format,
                    show: false,
                    weekends: vm.value.weekends
                })
            }
        }

    },

    i18n: {
        messages: {
            en: {
                weekends: 'Show weekends'
            },
            de: {
                weekends: 'Wochenenden anzeigen'
            }
        }
    }

}
</script>
