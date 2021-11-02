import { lazy } from 'react';

const ramsRouteConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/users-management/users',
            component: lazy(() => import('./UserManagement/Users/Users.js'))
        },
        {
            path: '/apps/users-management/user/:userId',
            component: lazy(() => import('./UserManagement/NewUser/NewUser.js'))
        }
    ]
}