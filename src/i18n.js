import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({

    locale: 'de',
    fallbackLocale: 'de',
    silentTranslationWarn: true,

    messages: {
        en: {
            views: {
                dashboard: 'Dashboard',
                plan: 'Duty Roster',
                settings: 'Settings',
                help: 'Support',
                plansettings: 'Edit Roster',
                notfound: 'Page not found',
                nopermission: 'No Permissions'
            }
        },
        de: {
            views: {
                dashboard: 'Dashboard',
                plan: 'Dienstplan',
                settings: 'Einstellungen',
                help: 'Support',
                plansettings: 'Plan bearbeiten',
                notfound: 'Seite nicht gefunden',
                nopermission: 'Keine Rechte'
            }
        }
    }

})
