<template>
    <v-flex xs12 md8>
        <h1 class="headline primary--text">{{ $t('welcome') }}</h1>
        <p>{{ $t('text1') }}</p>
        <p>{{ $t('text2') }}</p>
        <v-btn :to="{name: 'settings'}" block large class="primary">
            {{ $t('button') }}
        </v-btn>
    </v-flex>
</template>

<script>
export default {
    name: 'NoTeamDashboard',

    i18n: {
        messages: {
            en: {
                welcome: 'Welcome to Pelan!',
                text1: `Apparently, you don't have a team yet. You can create your own team or join an existing one at any time if you have received an invitation code. Each team has its own schedule in which missions can be planned, whereby shifts and times of day can be adjusted individually.`,
                text2: 'If you want to join a team or create a new one, add it in your settings:',
                button: 'Open settings'
            },
            de: {
                welcome: 'Willkommen bei Pelan!',
                text1: `Scheinbar hast du noch kein Team. Du kannst jederzeit selber eines erstellen
                    oder einem bestehenden beitreten, wenn du einen Einladungscode erhalten hast. Jedes Team verfügt über einen eigenen Plan in welchem
                    Einsätze geplant werden können, wobei sich die Schichten und Tageszeiten indivduell anpassen
                    lassen.`,
                text2: 'Wenn du einem Team beitreten oder ein neues erstellen willst, füge es in deinen Einstellungen hinzu:',
                button: 'Zu den Einstellungen'
            }
        }
    }

}
</script>
