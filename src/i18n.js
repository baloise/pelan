import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({

    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,

    messages: {
        en: {
            $vuetify: {
                noDataText: 'No data found',
                dataTable: {
                    rowsPerPageText: 'Items per page:'
                },
                dataIterator: {
                    pageText: '{0}-{1} of {2}',
                    noResultsText: 'No results',
                    rowsPerPageAll: 'All',
                    prevPage: 'Previous',
                    nextPage: 'Next'
                }
            },
            views: {
                dashboard: 'Dashboard',
                plan: 'Plan',
                settings: 'Settings',
                edits: 'Admin',
                teamchange: 'Change Team',
                plansettings: 'Edit Plan',
                teamsettings: 'Edit Team',
                help: 'Support',
                register: 'Get Access',
                notfound: 'Page not found',
                nopermission: 'No Permissions'
            },
            alert: {
                success: 'Changes saved',
                error: 'Error while saving changes',
                require: 'Required value',
                valid: 'This value is not valid',
                authFail: 'Authentication was not successful',
                loadFail: 'There was an error while loading the data'
            },
            btn: {
                save: 'Save',
                close: 'Close',
                cancel: 'Cancel'
            }
        },
        de: {
            $vuetify: {
                noDataText: 'Keine Einträge gefunden',
                dataTable: {
                    rowsPerPageText: 'Einträge pro Seite:'
                },
                dataIterator: {
                    pageText: '{0}-{1} von {2}',
                    noResultsText: 'Keine Resultate',
                    rowsPerPageAll: 'Alle',
                    prevPage: 'Zurück',
                    nextPage: 'Weiter'
                }
            },
            views: {
                dashboard: 'Dashboard',
                plan: 'Dienstplan',
                settings: 'Einstellungen',
                teamchange: 'Team wechseln',
                edits: 'Admin',
                plansettings: 'Plan bearbeiten',
                teamsettings: 'Team bearbeiten',
                help: 'Support',
                register: 'Anmelden',
                notfound: 'Seite nicht gefunden',
                nopermission: 'Keine Rechte'
            },
            alert: {
                success: 'Änderungen gespeichert',
                error: 'Fehler beim speichern der Änderungen',
                require: 'Wert wird benötigt',
                valid: 'Dieser Wert ist invalid',
                authFail: 'Authentifizierung war nicht erfolgreich',
                loadFail: 'Während dem Laden der Daten ist ein Fehler aufgetreten.'
            },
            btn: {
                save: 'Speichern',
                close: 'Schliessen',
                cancel: 'Abbrechen'
            }
        }
    }

})
