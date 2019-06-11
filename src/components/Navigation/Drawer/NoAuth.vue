<template>
    <v-layout column fill-height>
        <v-list>
            <v-list-tile v-if="!ssoNav" :to="{name: 'login'}">
                <v-list-tile-action>
                    <v-icon>lock_open</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="title">{{ $t('views.login') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'register'}">
                <v-list-tile-action>
                    <v-icon>how_to_reg</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="title">{{ $t('views.register') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-spacer></v-spacer>

        <v-list>
            <v-list-tile :to="{name: 'help'}">
                <v-list-tile-action>
                    <v-icon>question_answer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('views.help') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content class="caption">
                    {{ info }}
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

    </v-layout>
</template>

<script>
export default {
    name: 'NoAuth',

    computed: {

        ssoNav () {
            if (this.$store.state.app.env === 'MEDUSA') return true
            return false
        },

        // Get Infos about the App
        info () {
            return this.$store.state.app.title + ' v' + this.$store.state.app.version
        }

    }

}
</script>
