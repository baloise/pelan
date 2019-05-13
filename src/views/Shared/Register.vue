<template>
    <v-container grid-list-xs fill-height>
        <v-layout row wrap align-center>

            <v-flex xs12>

                <h1 class="display-1 primary--text">Willkommen!</h1>
                <p>Scheinbar bist du zum ersten Mal hier.</p>

                <v-stepper v-model="step">

                    <v-stepper-header class="elevation-0">
                        <v-stepper-step :complete="step > 1" step="1">Deine Details</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="step > 2" step="2">Dein Profil</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">Dein Team</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>

                        <v-stepper-content step="1">

                            <v-text-field label="Vorname"></v-text-field>
                            <v-text-field label="Nachname"></v-text-field>

                            <v-btn color="primary" @click="step = 2">Weiter</v-btn>
                            <v-btn flat>Zurück</v-btn>

                        </v-stepper-content>

                        <v-stepper-content step="2">

                            <v-text-field label="Nickname"></v-text-field>

                            <v-btn color="primary" @click="step = 3">Weiter</v-btn>
                            <v-btn flat @click="step = 1">Zurück</v-btn>

                        </v-stepper-content>

                        <v-stepper-content step="3">

                            <p>Wurdest du zu einem Team eingeladen? Oder möchtest du ein neues erstellen?</p>

                            <v-btn color="primary" block depressed>Einladungscode eingeben</v-btn>
                            <v-btn color="primary" block disabled>Neues Team erstellen</v-btn>

                            <v-card color="primary" dark class="ma-5">
                                <v-card-text>
                                    <v-text-field outline label="Einladungscode"></v-text-field>
                                </v-card-text>
                            </v-card>

                            <v-btn color="primary">Zum Plan</v-btn>
                            <v-btn flat @click="step = 2">Zurück</v-btn>

                        </v-stepper-content>

                    </v-stepper-items>
                </v-stepper>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Register',

    data () {
        return {
            step: 3,
            formdata: {
                firstname: null,
                lastname: null,
                nickname: null,
                code: null,
                newTeam: false
            }
        }
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
