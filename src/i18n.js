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
                login: 'Login',
                logout: 'Logout',
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
                loadFail: 'There was an error while loading the data',
                registered: 'Your Account has been created. Welcome to Pelan!'
            },
            btn: {
                save: 'Save',
                close: 'Close',
                cancel: 'Cancel'
            },
            language: {
                en: 'English',
                de: 'German'
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
                login: 'Anmelden',
                logout: 'Abmelden',
                register: 'Konto erstellen',
                notfound: 'Seite nicht gefunden',
                nopermission: 'Keine Rechte'
            },
            alert: {
                success: 'Änderungen gespeichert',
                error: 'Fehler beim speichern der Änderungen',
                require: 'Wert wird benötigt',
                valid: 'Dieser Wert ist invalid',
                authFail: 'Authentifizierung war nicht erfolgreich',
                loadFail: 'Während dem Laden der Daten ist ein Fehler aufgetreten.',
                register: 'Dein Account wurde erstellt. Willkommen bei Pelan!'
            },
            btn: {
                save: 'Speichern',
                close: 'Schliessen',
                cancel: 'Abbrechen'
            },
            language: {
                en: 'Englisch',
                de: 'Deutsch'
            }
        }
    }

})
