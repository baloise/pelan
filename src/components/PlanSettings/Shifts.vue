<template>
    <v-flex xs12>
        <v-layout row wrap>

            <v-flex xs12 sm6 md4 class="pb-2 pr-2" v-for="shift in shiftList" :key="shift.id">
                <v-card class="fill-height">
                    <v-sheet v-if="!shift.color.hex" class="d-flex" :color="shift.color" height="15"></v-sheet>
                    <v-sheet v-else class="d-flex" :color="shift.color.hex" height="15"></v-sheet>
                    <v-card-title primary-title>
                        <h2 class="title">{{ shift.title }}</h2>
                    </v-card-title>
                    <v-card-text>
                        {{ shift.description }}<br />
                        <span v-if="!shift.color.hex">{{ $t('color') }}: {{ shift.color }}</span>
                        <span v-else>Farbe: {{ shift.color.hex }}</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn aria-label="edit" flat @click="edit(shift)"><v-icon>edit</v-icon></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn aria-label="delete" flat @click="tobedeleted = shift; yousuredialog = true"><v-icon>delete</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md4 class="pb-2 pr-2">
                <v-card class="fill-height">
                    <v-sheet class="d-flex" color="secondary" height="15"></v-sheet>
                    <v-card-title primary-title>
                        <h2 class="title text--secondary"><i>{{ $t('create.title') }}</i></h2>
                    </v-card-title>
                    <v-card-text>
                        <i class="text--secondary">{{ $t('create.text') }}</i><br />‌‌
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn aria-label="add" flat class="text--secondary" @click="addNew()"><v-icon large>add</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-form ref="formData">
                <v-dialog persistent v-model="dialog" max-width="700" :fullscreen="$vuetify.breakpoint.xsOnly">
                    <v-card>
                        <v-card-title v-if="dialogAction == 1" class="headline primary--text">{{ $t('editor.shift.add') }}</v-card-title>
                        <v-card-title v-if="dialogAction == 2" class="headline primary--text">{{ $t('editor.shift.edit') }}</v-card-title>

                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 sm6>
                                    <div class="baloise-input">
                                        <span>{{ $t('editor.title') }}</span>
                                        <input required type="text" v-model="formdata.title"/>
                                    </div>
                                    <div class="baloise-input">
                                        <span>{{ $t('editor.description') }}</span>
                                        <textarea type="text" v-model="formdata.description"></textarea>
                                    </div>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <color-picker class="colorPicker" v-model="formdata.color" />
                                </v-flex>
                            </v-layout>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn aria-label="cancel" flat @click="dialog = false" :disabled="disabled">{{ $t('btn.cancel') }}</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn aria-label="add" flat class="baloise-button" v-if="dialogAction == 1" @click="add()" :disabled="disabled">{{ $t('editor.add') }}</v-btn>
                            <v-btn aria-label="save" flat class="baloise-button" v-if="dialogAction == 2" @click="save()" :disabled="disabled">{{ $t('btn.save') }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-form>

            <v-dialog persistent v-model="yousuredialog" max-width="700">
                <v-card>
                    <v-card-title class="headline">{{ $t('yousure.title') }}</v-card-title>
                    <v-card-text>
                        {{ $t('yousure.text') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex xs12 md4 pa-2>
                                <v-btn block aria-label="cancel" @click="tobedeleted = null; yousuredialog = false" :disabled="disabled" outline>{{ $t('yousure.stop') }}</v-btn>
                            </v-flex>
                            <v-flex xs12 md8 pa-2>
                                <v-btn block aria-label="accept" @click="delet()" :disabled="disabled" color="warning">{{ $t('yousure.accept') }}</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-layout>
    </v-flex>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
    name: 'Shifts',

    components: {
        'color-picker': Chrome
    },

    data () {
        return {
            dialog: false,
            dialogAction: null,
            yousuredialog: false,
            tobedeleted: null,
            disabled: false,
            formdata: {
                id: false,
                title: null,
                color: { hex: null }
            }
        }
    },

    computed: {
        shiftList () {
            return this.$store.state.app.shifts
        }
    },

    methods: {

        // Special validation for baloise-like Form
        isValid () {
            var vm = this
            if (vm.formdata.id !== 0) {
                if (vm.formdata.title && vm.formdata.title.length < 255) {
                    if (vm.formdata.description && vm.formdata.color.hex) {
                        return true
                    }
                }
            }
            return false
        },

        // Set shift and open edit-dialog
        edit (shift) {
            this.formdata.title = shift.title
            this.formdata.id = shift.id
            this.formdata.description = shift.description
            this.formdata.color = { hex: shift.color }
            this.dialogAction = 2
            this.dialog = true
        },

        // Open Add-dialog
        addNew () {
            this.formdata.title = null
            this.formdata.id = 'new'
            this.formdata.description = null
            this.formdata.color = { hex: '#ffffff' }
            this.dialogAction = 1
            this.dialog = true
        },

        // Save changes made with editor-dialog
        save () {
            var vm = this
            if (!vm.isValid()) {
                vm.$notify({ type: 'error', text: vm.$t('invalid') })
            } else {
                vm.disabled = true
                vm.$http.post('shift/edit/', {
                    id: vm.formdata.id,
                    title: vm.formdata.title,
                    color: vm.formdata.color.hex,
                    description: vm.formdata.description
                }).then(function (response) {
                    var str = vm.$store.state.app.shifts
                    for (var i = 0; i < str.length; i++) {
                        if (str[i].id === vm.formdata.id) {
                            str[i].title = vm.formdata.title
                            str[i].color = vm.formdata.color.hex
                            str[i].description = vm.formdata.description
                        }
                    }

                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                    vm.dialog = false
                    vm.disabled = false
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                    vm.disabled = false
                })
            }
        },

        // Save data made with add-dialog
        add () {
            var vm = this
            if (!vm.isValid()) {
                vm.$notify({ type: 'error', text: vm.$t('invalid') })
            } else {
                vm.disabled = true
                vm.$http.post('shift/create/', {
                    title: vm.formdata.title,
                    color: vm.formdata.color.hex,
                    description: vm.formdata.description
                }).then(function (response) {
                    vm.$store.state.app.shifts.push({
                        id: response.data.content,
                        title: vm.formdata.title,
                        color: vm.formdata.color.hex,
                        description: vm.formdata.description
                    })
                    vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                    vm.dialog = false
                    vm.disabled = false
                }).catch(function () {
                    vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                    vm.disabled = false
                })
            }
        },

        // Delete a shift
        delet () {
            var vm = this
            vm.disabled = true
            var storeElems = vm.$store.state.app.shifts
            vm.$http.post('shift/delete/', { id: vm.tobedeleted.id }).then(function (response) {
                var elem = storeElems.indexOf(vm.tobedeleted)
                storeElems.splice(elem, 1)
                vm.yousuredialog = false
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                vm.disabled = false
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                vm.disabled = false
            })
        }

    },

    mounted () {
        var vm = this

        // Get shifts (even if they are in store, bc there may be new ones)
        vm.$http.get('shift/read/').then(function (response) {
            if (response.data.content) { vm.$store.state.app.shifts = response.data.content }
        }).catch(function () {
            vm.$notify({ type: 'error', text: vm.$t('alert.loadFail') })
        })
    },

    i18n: {
        messages: {
            en: {
                editor: {
                    title: 'Title',
                    description: 'Description',
                    add: 'Add',
                    shift: {
                        edit: 'Edit Shift',
                        add: 'Add Shift'
                    }
                },
                yousure: {
                    title: 'Are you sure about that?',
                    text: 'Deleting this Shift will remove it from all existing Assignments, so they will be unassigned again. Please only proceed if this is wanted.',
                    accept: 'I know, delete the Shift',
                    stop: 'Cancel deletion'
                },
                create: {
                    title: 'Create',
                    text: 'Would you like to add another Shift?'
                },
                color: 'Color',
                long: 'Value is too long',
                invalid: 'Please check your inputs. All fields are required.'
            },
            de: {
                editor: {
                    title: 'Titel',
                    description: 'Beschreibung',
                    add: 'Hinzufügen',
                    shift: {
                        edit: 'Schicht bearbeiten',
                        add: 'Schicht hinzufügen'
                    }
                },
                yousure: {
                    title: 'Bist du dir sicher?',
                    text: 'Das löschen dieser Schicht wird sie von allen bestehenden Einsätzen entfernen, wodurch die Einsätze undefiniert werden. Fahre nur fort, wenn du das möchtest.',
                    accept: 'Ich weiss, lösche die Schicht',
                    stop: 'Löschen abbrechen'
                },
                create: {
                    title: 'Erstellen',
                    text: 'Möchtest du eine Schicht erstellen?'
                },
                color: 'Farbe',
                long: 'Wert ist zu lang',
                invalid: 'Bitte überprüfe deine Eingaben. Alle Felder werden benötigt.'
            }
        }
    }

}
</script>

<style scoped>

    .baloise-input {
        margin-top: 15px;
    }

    .baloise-input span {
        color: #008AC9;
    }

    .baloise-input input, .baloise-input textarea {
        border: 1px solid #008AC9;
        line-height: 1.3125rem;
        padding: 6px 15px 4px;
        width: 100%;
        color: #008AC9;
        transition: border-color .3s linear,background-color .3s linear;
    }

    .baloise-input input:focus, .baloise-input textarea:focus {
        background-color: #E5F3F9;
    }

    .baloise-button {
        background-color: #F90;
        padding: 11px 15px 9px;
        color: #fff;
        margin-right: 10px;
        border-radius: 0px;
        transition: all 250ms ease-in-out;
        font-size: .875rem;
        line-height: 1.25rem;
    }

    .baloise-button:hover {
        background-color: #008AC9;
    }

    .colorPicker {
        margin-left:auto;
        margin-right:auto;
        margin-top: 10px;
        margin-bottom: 10px;
        box-shadow: none;
        border: 1px solid #dadada;
    }

</style>