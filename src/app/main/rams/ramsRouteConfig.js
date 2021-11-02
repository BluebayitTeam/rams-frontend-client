import { lazy } from 'react';

const ramsRouteConfig = {
    settings: {
        layout: {}
    },
    routes: [
        // {
        //     path: '/apps/users-management/users',
        //     component: lazy(() => import('./UserManagement/Users/Users.js'))
        // },
        // {
        //     path: '/apps/users-management/user/:userId',
        //     component: lazy(() => import('./UserManagement/NewUser/NewUser.js'))
        // },
        //employee
        {
            path: '/apps/employee-management/employees',
            component: lazy(() => import('./EmployeeManagement/Employees/Employees'))
        },
        {
            path: '/apps/employee-management/:employeeId',
            component: lazy(() => import('./EmployeeManagement/Employee/NewEmployee'))
        },
        {
            path: '/apps/employee-management/:employeeId/:employeeName?',
            component: lazy(() => import('./EmployeeManagement/Employee/NewEmployee'))
        },
    ]
}

export default ramsRouteConfig;