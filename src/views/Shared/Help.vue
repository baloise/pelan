<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12>

                <h1 class="display-1 accent--text">{{ $t('views.help') }}</h1>
                <p class="body-2">{{ $t('subText') }}</p>

                <v-layout row wrap>

                    <v-flex xs12 sm6 class="pa-1">
                        <v-card class="fill-height">
                            <v-card-title primary-title>
                                <h1 class="headline primary--text">Baloise Helpdesk</h1>
                            </v-card-title>
                            <v-card-text class="pt-0 pb-0">
                                Basler Versicherungen <br />
                                Aeschengraben 21 <br />
                                4002 Basel
                            </v-card-text>
                            <v-card-text>
                                <a href="mailto:helpdesk@baloise.com">helpdesk@baloise.ch</a> <br />
                                <a href="tel:+41582857777">+41 58 285 77 77</a>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs12 sm6 class="pa-1">
                        <v-card class="fill-height">
                            <v-card-title primary-title>
                                <h1 class="headline primary--text">Elia Reutlinger</h1>
                            </v-card-title>
                            <v-card-text class="pt-0 pb-0">
                                Elia Reutlinger <br />
                                Schwarzwaldallee 33 <br />
                                4058 Basel
                            </v-card-text>
                            <v-card-text>
                                <a href="mailto:mail@eliareutlinger.ch">mail@eliareutlinger.ch</a> <br />
                            </v-card-text>
                        </v-card>
                    </v-flex>

                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Help',

    i18n: {
        messages: {
            en: {
                subText: 'If you have a problem or question, please contact one of the addresses below.'
            },
            de: {
                subText: 'Wenn du Fragen oder Probleme hast, kontaktiere bitte eine der folgenden Adressen.'
            }
        }
    }

}
</script>
