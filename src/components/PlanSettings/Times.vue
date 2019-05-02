<template>
    <v-flex xs12 class="pa-0">

        <v-layout row wrap class="mb-2" align-center>
            <v-flex xs12 md3>
                <v-btn :disabled="!changes" @click="save()" color="primary" block>{{ $t('btn.save') }}</v-btn>
            </v-flex>
            <v-flex xs12 md2 class="text-md-center">
                <h3 class="title warning--text" v-html="$t('attention.title')"></h3>
            </v-flex>
            <v-flex xs12 md7 class="text-md-center">
                <span class="body-2" v-html="$t('attention.text')"></span>
            </v-flex>
        </v-layout>

        <transition-group name="fade" v-if="list.length">
            <v-card v-for="element in list" :key="element.id" class="mb-2">
                <v-card-text v-if="!element.deleted">
                    <v-layout row wrap>
                        <v-flex xs2 sm1 class="pt-2 pl-4">
                            <h1 class="title primary--text">{{ element.position }}</h1>
                        </v-flex>
                        <v-flex xs10 sm5 class="pt-2 text-xs-right text-sm-left" @click="editElem(element)">
                            <h1 class="title">{{ element.title }}</h1>
                        </v-flex>
                        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                            <v-btn aria-label="move down" flat icon @click="moveDown(element)" v-if="element.position !== list[list.length-1].position"><v-icon>arrow_downward</v-icon></v-btn>
                            <v-btn aria-label="move up" flat icon @click="moveUp(element)" v-if="parseInt(element.position) !== 1"><v-icon>arrow_upward</v-icon></v-btn>
                            <v-btn aria-label="edit" flat icon @click="editElem(element)"><v-icon>edit</v-icon></v-btn>
                            <v-btn aria-label="delete" flat icon @click="deleteElem(element)"><v-icon>delete</v-icon></v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </transition-group>

        <v-form v-model="rules.valid" ref="adderForm">
            <v-card transition="fade" class="">
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs0 sm1>
                        </v-flex>
                        <v-flex xs10 sm8>
                            <v-text-field :rules="rules.set" v-model="newElement.title" :label="$t('edit.desc')" required></v-text-field>
                        </v-flex>
                        <v-flex xs2 sm3 class="text-xs-right pa-2">
                            <v-btn aria-label="add" flat icon @click="add()"><v-icon large>add</v-icon></v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-form>

        <v-form v-model="rules.valid" ref="editorForm">
            <v-dialog v-model="dialog" persistent max-width="290" v-if="editID !== false">
                <v-card>
                    <v-card-title class="headline">{{ $t('edit.title') }}</v-card-title>
                    <v-card-text>
                        <v-text-field :rules="rules.set" v-model="list[editID].title" :label="$t('edit.desc')" required></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn aria-label="close" flat @click="validTitle()">
                            {{ $t('btn.close') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

    </v-flex>
</template>

<script>
export default {
    name: 'Times',

    data () {
        return {
            dialog: false,
            editID: false,
            changes: false,
            newElement: {
                position: null,
                title: null
            },
            rules: {
                valid: false,
                set: [(v) => !!v || this.$t('alert.require')]
            }
        }
    },

    computed: {

        // Sort received times by their position-number before showing
        list () {
            var stEl = this.$store.state.app.times
            if (stEl) {
                stEl.sort((a, b) => (parseInt(a.position) > parseInt(b.position)) ? 1 : ((parseInt(b.position) > parseInt(a.position)) ? -1 : 0))
                return stEl
            }
            return false
        }

    },

    methods: {

        // Check if new title (from editor-dialog) is valid
        validTitle () {
            this.$refs.editorForm.validate()
            if (this.$data.rules.valid) this.dialog = false
        },

        // Save changes and/or delete time, if selected
        save () {
            var vm = this; var error = false
            var str = this.$store.state.app.times
            vm.$refs.editorForm.validate()
            for (var i = 0; i < str.length; i++) {
                if (str[i].deleted) {
                    var elem = str[i]
                    vm.$http.post('daytime/delete/', { id: elem.id }).then(function (response) {
                        for (var y = 0; y < str.length; y++) {
                            if (str[y].id === elem.id) str.splice(y, 1)
                        }
                    }).catch(function () { error = true })
                } else if (str[i].edited) {
                    vm.$http.post('daytime/edit/', {
                        id: str[i].id,
                        title: str[i].title,
                        abbreviation: str[i].title.substring(0, 4),
                        description: str[i].title,
                        position: str[i].position
                    }).then(function (response) {}).catch(function () { error = true })
                }
            }
            if (!error) {
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                vm.changes = false
            } else {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            }
        },

        // Add new Time
        add () {
            var vm = this; var newPosition = 1
            vm.$refs.adderForm.validate()
            if (vm.list.length) newPosition = parseInt(vm.list[vm.list.length - 1].position) + 1

            if (vm.$data.rules.valid) {
                vm.$http.post('daytime/create/', {
                    title: vm.newElement.title,
                    abbreviation: vm.newElement.title.substring(0, 4),
                    description: vm.newElement.title,
                    position: newPosition
                }).then(function (response) {
                    vm.$store.state.app.times.push({
                        title: vm.newElement.title,
                        abbreviation: vm.newElement.title.substring(0, 4),
                        position: newPosition,
                        id: response.data.content
                    })
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                    vm.$refs.adderForm.reset()
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                })
            }
        },

        // Process changes made to a time
        editElem (elem) {
            var str = this.$store.state.app.times
            for (var i = 0; i < str.length; i++) {
                if (str[i].id === elem.id) {
                    str[i].edited = true
                    str[i].title = elem.title
                    str[i].abbreviation = elem.title.substring(0, 4)
                    str[i].description = elem.title
                    str[i].position = elem.position
                }
            }
            this.editID = str.indexOf(elem)
            this.dialog = true
            this.changes = true
        },

        // Process delete-changes made to a time
        deleteElem (elem) {
            var deletePos = elem.position
            var storeElems = this.$store.state.app.times
            for (var i = 0; i < storeElems.length; i++) {
                if (storeElems[i].id === elem.id) {
                    storeElems[i].deleted = true
                    storeElems[i].position = -1
                }

                if (storeElems[i].position > deletePos) {
                    storeElems[i].position -= 1
                    storeElems[i].edited = true
                }
            }
            this.changes = true
        },

        // Process and move time
        moveDown (currElem) {
            var currPos = parseInt(currElem.position)
            var storeElems = this.$store.state.app.times
            if (storeElems.length > 1) {
                for (var i = 0; i < storeElems.length; i++) {
                    if (storeElems[i].id === currElem.id) {
                        storeElems[i].position = parseInt(storeElems[i].position) + 1
                        storeElems[i].edited = true
                    }
                    if (storeElems[i].id !== currElem.id && parseInt(storeElems[i].position) === currPos + 1) {
                        storeElems[i].position = parseInt(storeElems[i].position) - 1
                        storeElems[i].edited = true
                    }
                }
                this.changes = true
            }
        },

        // Process and move time
        moveUp (currElem) {
            var currPos = parseInt(currElem.position)
            var storeElems = this.$store.state.app.times
            if (storeElems.length > 1) {
                for (var i = 0; i < storeElems.length; i++) {
                    if (storeElems[i].id === currElem.id) {
                        storeElems[i].position = parseInt(storeElems[i].position) - 1
                        storeElems[i].edited = true
                    }
                    if (storeElems[i].id !== currElem.id && parseInt(storeElems[i].position) === currPos - 1) {
                        storeElems[i].position = parseInt(storeElems[i].position) + 1
                        storeElems[i].edited = true
                    }
                }
                this.changes = true
            }
        }

    },

    mounted () {
        var vm = this

        // Get times (even if they are in store, bc there may be new ones)
        vm.$http.get('daytime/read/').then(function (response) {
            if (response.data.content) vm.$store.state.app.times = response.data.content
        }).catch(function () {
            vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
        })
    },

    i18n: {
        messages: {
            en: {
                edit: {
                    title: 'Edit Title',
                    desc: 'Title'
                },
                attention: {
                    title: 'Keep in mind',
                    text: "Deleting a Time will remove it and all it's assignments from the Duty Roster. This <b>cannot</b> be undone."
                }
            },
            de: {
                edit: {
                    title: 'Titel bearbeiten',
                    desc: 'Titel'
                },
                attention: {
                    title: 'Achtung',
                    text: 'Das Löschen einer Zeit entfernt sie und alle ihr zugeordneten Einsätze aus dem Einsatzplan. Dies kann <b>nicht</b> rückgängig gemacht werden.'
                }
            }
        }
    }

}
</script>
