import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('./views/Secure/Dashboard.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: false
            }
        },
        {
            path: '/plan',
            name: 'plan',
            component: () => import('./views/Secure/Plan.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: false
            }
        },
        {
            path: '/plansettings',
            name: 'plansettings',
            component: () => import('./views/Secure/PlanSettings.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: '/teamsettings',
            name: 'teamsettings',
            component: () => import('./views/Secure/TeamSettings.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('./views/Secure/Settings.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: false
            }
        },
        {
            path: '/help',
            name: 'help',
            component: () => import('./views/Shared/Help.vue'),
            meta: {
                requiresAuth: false,
                requiresAdmin: false
            }
        },
        {
            path: '/register',
            component: () => import('./views/Shared/Register/'),
            children: [
                {
                    path: '',
                    name: 'register',
                    component: () => import('./views/Shared/Register/Form')
                },
                {
                    path: 'verify',
                    name: 'verify',
                    component: () => import('./views/Shared/Register/Verify')
                }
            ],
            meta: {
                requiresAuth: false,
                requiresAdmin: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Shared/Login.vue'),
            meta: {
                requiresAuth: false,
                requiresAdmin: false
            }
        },
        {
            path: '/401',
            name: 'nopermission',
            component: () => import('./views/Shared/NoPermission'),
            meta: {
                requiresAuth: false,
                requiresAdmin: false
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: () => import('./views/Shared/NotFound'),
            meta: {
                requiresAuth: false,
                requiresAdmin: false
            }
        }
    ]

})
