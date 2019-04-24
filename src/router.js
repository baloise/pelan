import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('./views/Secure/Dashboard.vue'),
            meta: {
                secure: true,
                admin: false
            }
        },
        {
            path: '/plan',
            name: 'plan',
            component: () => import('./views/Secure/Plan.vue'),
            meta: {
                secure: true,
                admin: false
            }
        },
        {
            path: '/plansettings',
            name: 'plansettings',
            component: () => import('./views/Secure/PlanSettings.vue'),
            meta: {
                secure: true,
                admin: true
            }
        },
        {
            path: '/help',
            name: 'help',
            component: () => import('./views/Secure/Help.vue'),
            meta: {
                secure: true,
                admin: false
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('./views/Secure/Settings.vue'),
            meta: {
                secure: true,
                admin: false
            }
        },
        {
            path: '/401',
            name: 'nopermission',
            component: () => import('./views/Shared/NoPermission'),
            meta: {
                secure: null,
                admin: false
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: () => import('./views/Shared/NotFound'),
            meta: {
                secure: null,
                admin: false
            }
        }
    ]
})
