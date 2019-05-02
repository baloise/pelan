<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <h1 class="display-1 primary--text">404</h1>
                <h1 v-text="$t('title')"></h1>
                <p v-text="$t('text')"></p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'NotFound',

    i18n: {
        messages: {
            en: {
                title: 'Not found',
                text: "This page is not available or couldn't be found"
            },
            de: {
                title: 'Seite nicht gefunden',
                text: 'Diese Seite konnte nicht gefunden werden oder ist momentan nicht verfügbar'
            }
        }
    }

}
</script>
