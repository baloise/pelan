<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>

                <h1 class="display-1 accent--text">{{ $t('views.settings') }}</h1>

                <h1 class="headline primary--text pt-3">{{ $t('lang') }}</h1>
                <LangChanger />

                <h1 v-if="$store.state.user.role.admin" class="headline primary--text pt-3">
                    {{ $t('users') }}
                </h1>
                <Users v-if="$store.state.user.role.admin" />

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import LangChanger from '@/components/Settings/LangChanger'
import Users from '@/components/Settings/Users'

export default {
    name: 'Settings',

    components: {
        LangChanger, Users
    },

    i18n: {
        messages: {
            en: {
                lang: 'Language',
                users: 'Users'
            },
            de: {
                lang: 'Sprache',
                users: 'Benutzer'
            }
        }
    }

}
</script>
