<template>
    <v-layout row justify-center>
        <v-dialog persistent v-model="show" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly">
            <v-card v-if="show">

                <v-card-title>
                    <span v-if="this.$store.state.user.role.admin" class="headline">{{ $t('editShift') }}</span>
                    <span v-else class="headline">{{ $t('shiftDetails') }}</span>
                </v-card-title>

                <v-card-text class="pt-0 pb-0">
                    <v-form v-model="rules.valid" ref="editorForm">
                        <v-layout wrap>
                            <v-flex xs12>
                                <h3 class="title">{{ formdata.user }}</h3>
                            </v-flex>
                            <v-flex xs12>
                                <p class="body-2">
                                    {{dFull}} / {{ formdata.time }}
                                </p>
                            </v-flex>
                            <v-flex xs12>
                                <v-select outline :label="$t('shift')" v-model="formdata.shift" :items="shiftList" :readonly="!this.$store.state.user.role.admin"></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea outline :label="$t('note')" v-model="formdata.note" :readonly="!this.$store.state.user.role.admin"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>

                <v-card-actions v-if="this.$store.state.user.role.admin">
                    <v-btn @click="updateShift()" :disabled="disabled" :loading="disabled" block large color="primary">
                        {{ $t('btn.save') }}
                        <span slot="loader" class="spinning-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                </v-card-actions>

                <v-card-actions>
                    <v-btn flat @click="$emit('close')">{{$t('btn.close')}}</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteShift()" v-if="this.$store.state.user.role.admin && (formdata.shift || formdata.note)" flat large>
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    name: 'AssignDialog',

    data () {
        return {
            disabled: false,
            rules: {
                valid: false,
                set: [(v) => !!v || this.$t('alert.require')]
            }
        }
    },

    props: {
        show: Boolean, content: Object
    },

    computed: {

        dFull () {
            var d = new Date(this.content.date)
            return d.getDay() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
        },

        // Create a list of shifts for dropdown
        shiftList () {
            var items = []
            if (this.$store.state.app.shifts) {
                for (var i = 0; i < this.$store.state.app.shifts.length; i++) {
                    items.push({
                        text: this.$store.state.app.shifts[i].title,
                        value: this.$store.state.app.shifts[i].id
                    })
                }
            }
            return items
        },

        // Check available data for inputs
        formdata () {
            var shift = null; var note = null
            if (this.content.shift) shift = this.content.shift.id
            if (this.content.note) note = this.content.note
            return {
                user: this.content.user.firstname + ' ' + this.content.user.lastname,
                time: this.content.time.title,
                date: this.content.date,
                shift: shift,
                note: note
            }
        }

    },

    methods: {

        removeObj (time, dateTime) {
            var str = this.$store.state.app.assigns[this.content.user.id]
            for (var i = 0; i < str.length; i++) {
                if (str[i].time === time && str[i].date.getTime() === dateTime) {
                    str.splice(i, 1)
                }
            }
        },

        deleteShift () {
            var vm = this
            vm.$http.post('assignment/delete/', {
                user: vm.content.user.id,
                time: vm.content.time.id,
                date: vm.formdata.date
            }).then(function (response) {
                vm.removeObj(vm.content.time.id, vm.content.dateFull.getTime())
                vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                vm.$emit('close')
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error') })
            })
        },

        updateShift () {
            var vm = this
            vm.$refs.editorForm.validate()

            if (vm.$data.rules.valid) {
                if (!vm.formdata.shift && !vm.formdata.note) {
                    vm.$notify({ type: 'error', text: vm.$t('emptyInputs') })
                } else if (vm.content.user.id && vm.content.time.id) {
                    vm.$data.disabled = true
                    vm.formdata.user = vm.content.user.id
                    vm.formdata.time = vm.content.time.id

                    vm.$http.post('assignment/set/', vm.formdata).then(function (response) {
                        vm.removeObj(vm.formdata.time, vm.content.dateFull.getTime())
                        vm.$store.state.app.assigns[vm.content.user.id].push(vm.formdata)
                        vm.$notify({ type: 'success', text: vm.$t('alert.success') })
                        vm.disabled = false
                        vm.$emit('close')
                    }).catch(function () {
                        vm.disabled = false
                        vm.$notify({ type: 'error', text: vm.$t('alert.error') })
                    })
                }
            }
        }

    },

    i18n: {
        messages: {
            en: {
                user: 'User',
                time: 'Time',
                date: 'Date',
                shift: 'Shift',
                note: 'Notes',
                editShift: 'Edit Shift',
                shiftDetails: 'Shift Details',
                emptyInputs: 'Please choose at least the Shift or write a note.'
            },
            de: {
                user: 'Benutzer',
                time: 'Zeit',
                date: 'Datum',
                shift: 'Schicht',
                note: 'Notizen',
                editShift: 'Schicht bearbeiten',
                shiftDetails: 'Details',
                emptyInputs: 'Bitte wähle mindestens eine Schicht oder schreibe eine Notiz.'
            }
        }
    }

}
</script>
