import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({

    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: process.env.NODE_ENV !== 'production',

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
                plan: 'Duty Roster',
                settings: 'Settings',
                help: 'Support',
                plansettings: 'Edit Roster',
                notfound: 'Page not found',
                nopermission: 'No Permissions'
            },
            alert: {
                success: 'Changes saved',
                error: 'Error while saving changes',
                require: 'Required value',
                authFail: 'Authentication was not successful',
                loadFail: 'There was an error while loading the data'
            }
        },
        de: {
            $vuetify: {
                noDataText: 'No data found',
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
                help: 'Support',
                plansettings: 'Plan bearbeiten',
                notfound: 'Seite nicht gefunden',
                nopermission: 'Keine Rechte'
            },
            alert: {
                success: 'Änderungen gespeichert',
                error: 'Fehler beim speichern der Änderungen',
                require: 'Wert wird benötigt',
                authFail: 'Authentifizierung war nicht erfolgreich',
                loadFail: 'Während dem Laden der Daten ist ein Fehler aufgetreten.'
            }
        }
    }

})
