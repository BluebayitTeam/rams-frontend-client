import { lazy } from 'react';

const ramsRouteConfig = {
    settings: {
        layout: {}
    },
    routes: [
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

        //department
        {
            path: '/apps/department-management/departments/:departmentId/:departmentName?',
            component: lazy(() => import('./DepartmentsManagement/Department/NewDepartment'))
        },
        {
            path: '/apps/department-management/departments',
            component: lazy(() => import('./DepartmentsManagement/Departments/Departments'))
        },
        {
            path: '/apps/department-management/:departmentId',
            component: lazy(() => import('./DepartmentsManagement/Department/NewDepartment'))
        },

        //qualification
        {
            path: '/apps/qualification-management/qualifications/:qualificationId/:qualificationName?',
            component: lazy(() => import('./QualificationsManagement/Qualification/NewQualification'))
        },
        {
            path: '/apps/qualification-management/qualifications',
            component: lazy(() => import('./QualificationsManagement/Qualifications/Qualifications'))
        },
        {
            path: '/apps/qualification-management/:qualificationId',
            component: lazy(() => import('./QualificationsManagement/Qualification/NewQualification'))
        },
    ]
}

export default ramsRouteConfig;