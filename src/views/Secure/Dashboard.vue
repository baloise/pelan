<template>
    <v-container fluid fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>
                <h1 class="display-1 accent--text">{{ $t('views.dashboard') }}</h1>
                <h1 class="title">{{ $t('welcome') }} {{$store.state.user.firstname}}</h1>
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
                welcome: 'Welcome'
            },
            de: {
                welcome: 'Willkommen'
            }
        }
    }

}
</script>
