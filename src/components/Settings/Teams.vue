<template>
    <v-flex xs12 class="pt-1">
        <v-card class="mb-2" v-for="team in teams" :key="team.id">
            <v-card-text>
                <v-layout row wrap align-center justify-center>

                    <v-flex xs12 md3>
                        <span class="caption">{{ $t('name') }}</span><br />
                        <span class="title">{{ team.title }}</span>
                    </v-flex>

                    <v-flex xs12 md3>
                        <span class="caption">{{ $t('owner') }}</span><br />
                        <span class="">{{ team.owner.name }}</span>
                    </v-flex>

                    <v-flex xs12 md5 class="text-md-right">
                        <span class="caption">{{ $t('desc') }}</span><br />
                        <span class="">{{ team.description }}</span>
                    </v-flex>

                    <v-flex xs12 md1 class="text-md-right">
                        <v-btn :disabled="team.owner.id == $store.state.user.id" flat icon >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>
            </v-card-text>
        </v-card>
        <p v-if="!teams.length">
            {{ $t('noTeam') }}
        </p>
    </v-flex>
</template>

<script>

export default {
    name: 'Teams',

    methods: {

        getTeams () {
            var vm = this
            vm.$http.post('team/read/').then(function (response) {
                if (response.data.content) vm.$store.state.data.teams = response.data.content
            })
        }

    },

    computed: {
        teams () {
            if (this.$store.state.data.teams) return this.$store.state.data.teams
            else this.getTeams()
            return false
        }
    },

    i18n: {
        messages: {
            en: {
                noTeam: 'You have not joined a team yet.',
                name: 'Name',
                owner: 'Owner',
                desc: 'Description'
            },
            de: {
                noTeam: 'Du bist noch in keinem Team.',
                name: 'Name',
                owner: 'Inhaber',
                desc: 'Beschreibung'
            }
        }
    }

}
</script>
