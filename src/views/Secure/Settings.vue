<template>
    <v-container fluid fill-height>
        <v-layout row wrap>

            <v-flex xs12>
                <h1 class="display-1 accent--text">{{ $t('views.settings') }}</h1>
            </v-flex>

            <v-flex xs12>
                <h1 class="headline primary--text">{{ $t('lang') }}</h1>
                <LangChanger />
            </v-flex>

            <v-flex xs12 v-if="$store.state.user.role.admin">
                <h1 class="headline primary--text">{{ $t('users') }}</h1>
                <Users />
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
