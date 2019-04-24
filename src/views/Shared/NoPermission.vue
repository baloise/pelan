<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <h1 class="display-1 primary--text">401</h1>
                <h1 v-text="$t('title')"></h1>
                <p v-text="$t('text')"></p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'NoPermission',
    i18n: {
        messages: {
            en: {
                title: 'No Permission',
                text: "You don't have permission to access this page."
            },
            de: {
                title: 'Keine Rechte',
                text: 'Sie haben nicht genügend Rechte um diese Seite aufzurufen.'
            }
        }
    }
}
</script>
