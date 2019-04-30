<template>
    <v-dialog v-model="value.show" width="290">
        <v-card>

            <v-card-text class="pa-0">
                <v-date-picker v-model="value.pickMonth" type="month" @input="value.show = false" color="primary" class="elevation-0" :locale="$store.state.user.language"></v-date-picker>
                <v-checkbox v-model="value.weekends" color="primary" :label="$t('weekends')" class="pl-4"></v-checkbox>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
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
