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

        //city
        {
            path: '/apps/city-management/cities/:cityId/:cityName?',
            component: lazy(() => import('./CitysManagement/City/NewCity'))
        },
        {
            path: '/apps/city-management/cities',
            component: lazy(() => import('./CitysManagement/Citys/Citys'))
        },
        {
            path: '/apps/city-management/:cityId',
            component: lazy(() => import('./CitysManagement/City/NewCity'))
        },

        //thana
        {
            path: '/apps/thana-management/thanas/:thanaId/:thanaName?',
            component: lazy(() => import('./ThanasManagement/Thana/NewThana'))
        },
        {
            path: '/apps/thana-management/thanas',
            component: lazy(() => import('./ThanasManagement/Thanas/Thanas'))
        },
        {
            path: '/apps/thana-management/:thanaId',
            component: lazy(() => import('./ThanasManagement/Thana/NewThana'))
        },

        //branch
        {
            path: '/apps/branch-management/branchs/:branchId/:branchName?',
            component: lazy(() => import('./BranchsManagement/Branch/NewBranch'))
        },
        {
            path: '/apps/branch-management/branchs',
            component: lazy(() => import('./BranchsManagement/Branchs/Branchs'))
        },
        {
            path: '/apps/branch-management/:branchId',
            component: lazy(() => import('./BranchsManagement/Branch/NewBranch'))
        },
    ]
}

export default ramsRouteConfig;