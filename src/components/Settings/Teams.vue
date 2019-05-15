<template>
    <v-card>

        <v-card-title class="pt-0 pb-0">
            <h1 class="headline primary--text pt-3">{{ $t('teams') }}</h1>
            <v-spacer></v-spacer>
            <Create />
        </v-card-title>

        <v-card-text>

            <v-card class="mb-2" v-for="team in teams" :key="team.id">
                <v-card-text>
                    <v-layout row wrap align-center justify-center>
                        <v-flex xs12 md3>
                            <span class="caption">{{ $t('name') }}</span><br />
                            <span class="title">{{ team.title }}</span>
                        </v-flex>
                        <v-flex xs12 md8>
                            <span class="caption">{{ $t('desc') }}</span><br />
                            <span class="">{{ team.description }}</span>
                        </v-flex>
                        <v-flex xs8 md1>
                            <span class="caption">{{ $t('public') }}</span><br />
                            <span class="">Nein</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

        </v-card-text>

    </v-card>
</template>

<script>
import Create from '@/components/Settings/Create'

export default {
    name: 'Teams',

    components: {
        Create
    },

    methods: {

        getTeams () {
            var vm = this
            vm.$http.post('team/read/').then(function (response) {
                if (response.data.content) vm.$store.state.app.teams = response.data.content
            })
        }

    },

    computed: {
        teams () {
            if (this.$store.state.app.teams) return this.$store.state.app.teams
            else this.getTeams()
            return false
        }
    },

    i18n: {
        messages: {
            en: {
                teams: 'Teams',
                name: 'Name',
                desc: 'Description',
                public: 'Pubilc',
                no: 'No'
            },
            de: {
                teams: 'Teams',
                name: 'Name',
                desc: 'Beschreibung',
                public: 'Öffentlich',
                no: 'Nein'
            }
        }
    }

}
</script>
