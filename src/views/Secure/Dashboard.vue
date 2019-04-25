<template>
    <v-container fluid fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>
                <h1 class="display-1 accent--text">{{ $t('views.dashboard') }}</h1>
                <h1 class="title">{{ call }}</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Dashboard',

    i18n: {
        messages: {
            en: {
                good: {
                    morning: 'Good morning {name}!',
                    noon: 'Hello {name}!',
                    evening: 'Good evening {name}!'
                }
            },
            de: {
                good: {
                    morning: 'Guten Morgen {name}!',
                    noon: 'Guten Tag {name}!',
                    evening: 'Guten Abend {name}!'
                }
            }
        }
    },

    computed: {

        // Use diffrent text at diffrent times
        call () {
            var hour = (new Date()).getHours()
            if (hour <= 11) {
                return this.$t('good.morning', { name: this.$store.state.user.firstname })
            } else if (hour <= 17) {
                return this.$t('good.noon', { name: this.$store.state.user.firstname })
            } else {
                return this.$t('good.evening', { name: this.$store.state.user.firstname })
            }
        }

    }

}
</script>
