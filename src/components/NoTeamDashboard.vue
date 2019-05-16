<template>
    <v-flex xs12 md8>
        <h1 class="headline primary--text">Willkommen bei Pelan!</h1>
        <p>
            Scheinbar hast du noch kein Team. Du kannst jederzeit selber eines erstellen
            oder einem bestehenden beitreten, wenn du einen Einladungscode erhalten hast. Jedes Team verfügt über einen eigenen Plan in welchem
            Einsätze geplant werden können, wobei sich die Schichten und Tageszeiten indivduell anpassen
            lassen.
        </p>
        <p>
            Wenn du einem Team beitreten oder ein neues erstellen willst, füge es in deinen Einstellungen hinzu:
        </p>

        <v-btn :to="{name: 'settings'}" block large class="primary">
            Zu den Einstellungen
        </v-btn>

    </v-flex>
</template>

<script>
import CreateTeam from '@/components/Settings/CreateTeam'

export default {
    name: 'NoTeamDashboard',

    components: {
        CreateTeam
    },

    i18n: {
        messages: {
            en: {

            },
            de: {

            }
        }
    }

}
</script>
