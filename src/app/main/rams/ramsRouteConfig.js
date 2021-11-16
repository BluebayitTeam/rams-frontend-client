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
        {
            path: '/apps/users-management/userslist',
            component: lazy(() => import('./EmployeeManagement/UsersList/UsersList'))
        },
        {
            path: '/apps/users-management/forgot-password/:userId',
            component: lazy(() => import('./EmployeeManagement/UsersList/ForgotPassword'))
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

        //sitesettings
        {
            path: '/apps/sitesettings-management/sitesetting/:sitesettingId/:sitesettingName?',
            component: lazy(() => import('./SitesettingsManagement/Sitesetting/NewSitesetting'))
        },
        {
            path: '/apps/sitesettings-management/sitesettings/',
            component: lazy(() => import('./SitesettingsManagement/Sitesettings/Sitesettings'))
        },
        {
            path: '/apps/sitesettings-management/sitesetting/:sitesettingId',
            component: lazy(() => import('./SitesettingsManagement/Sitesetting/NewSitesetting'))
        },

        //permission
        {
            path: '/apps/permission-management/permissions/:permissionId/:permissionName?',
            component: lazy(() => import('./PermissionsManagement/Permission/NewPermission'))
        },
        {
            path: '/apps/permission-management/permissions',
            component: lazy(() => import('./PermissionsManagement/Permissions/Permissions'))
        },
        {
            path: '/apps/permission-management/:permissionId',
            component: lazy(() => import('./PermissionsManagement/Permission/NewPermission'))
        },

        //roles
        {
            path: '/apps/roles-management/roles',
            component: lazy(() => import('./RoleManagement/Roles/Roles'))
        },
        {
            path: '/apps/roles-management/:roleId',
            component: lazy(() => import('./RoleManagement/Role/NewRole'))
        },
        {
            path: '/apps/roles-management/:roleId/:roleName?',
            component: lazy(() => import('./RoleManagement/Role/NewRole'))
        },
        //menu
        {
            path: '/apps/menu-management/menus/:menuId/:menuName?',
            component: lazy(() => import('./MenusManagement/Menu/NewMenu.js'))
        },
        {
            path: '/apps/menu-management/menus',
            component: lazy(() => import('./MenusManagement/Menus/Menus'))
        },
        {
            path: '/apps/menu-management/:menuId',
            component: lazy(() => import('./MenusManagement/Menu/NewMenu'))
        },

        //roleMenu
        {
            path: '/apps/roleMenu-management/roleMenus/:roleMenuId/:roleMenuName?',
            component: lazy(() => import('./RoleMenusManagement/RoleMenu/NewRoleMenu.js'))
        },
        {
            path: '/apps/roleMenu-management/roleMenus',
            component: lazy(() => import('./RoleMenusManagement/RoleMenus/RoleMenus'))
        },
        {
            path: '/apps/roleMenu-management/:roleMenuId',
            component: lazy(() => import('./RoleMenusManagement/RoleMenu/NewRoleMenu'))
        },

        //passengerType
        {
            path: '/apps/passengerType-management/passengerTypes/:passengerTypeId/:passengerTypeName?',
            component: lazy(() => import('./PassengerTypesManagement/PassengerType/NewPassengerType.js'))
        },
        {
            path: '/apps/passengerType-management/passengerTypes',
            component: lazy(() => import('./PassengerTypesManagement/PassengerTypes/PassengerTypes'))
        },
        {
            path: '/apps/passengerType-management/:passengerTypeId',
            component: lazy(() => import('./PassengerTypesManagement/PassengerType/NewPassengerType'))
        },

        //currentStatus
        {
            path: '/apps/currentStatus-management/currentStatuss/:currentStatusId/:currentStatusName?',
            component: lazy(() => import('./CurrentStatussManagement/CurrentStatus/NewCurrentStatus.js'))
        },
        {
            path: '/apps/currentStatus-management/currentStatuss',
            component: lazy(() => import('./CurrentStatussManagement/CurrentStatuss/CurrentStatuss'))
        },
        {
            path: '/apps/currentStatus-management/:currentStatusId',
            component: lazy(() => import('./CurrentStatussManagement/CurrentStatus/NewCurrentStatus'))
        },
        //profession
        {
            path: '/apps/profession-management/professions/:professionId/:professionName?',
            component: lazy(() => import('./ProfessionsManagement/Profession/NewProfession'))
        },
        {
            path: '/apps/profession-management/professions',
            component: lazy(() => import('./ProfessionsManagement/Professions/Professions'))
        },
        {
            path: '/apps/profession-management/:professionId',
            component: lazy(() => import('./ProfessionsManagement/Profession/NewProfession'))
        },
        //agent
        {
            path: '/apps/agent-management/agents/:agentId/:agentName?',
            component: lazy(() => import('./AgentsManagement/Agent/NewAgent.js'))
        },
        {
            path: '/apps/agent-management/agents',
            component: lazy(() => import('./AgentsManagement/Agents/Agents'))
        },
        {
            path: '/apps/agent-management/:agentId',
            component: lazy(() => import('./AgentsManagement/Agent/NewAgent'))
        },
        //demand
        {
            path: '/apps/demand-management/demands/:demandId/:demandName?',
            component: lazy(() => import('./DemandsManagement/Demand/NewDemand.js'))
        },
        {
            path: '/apps/demand-management/demands',
            component: lazy(() => import('./DemandsManagement/Demands/Demands'))
        },
        {
            path: '/apps/demand-management/:demandId',
            component: lazy(() => import('./DemandsManagement/Demand/NewDemand'))
        },
        //recruitingAgency
        {
            path: '/apps/recruitingAgency-management/recruitingAgencys/:recruitingAgencyId/:recruitingAgencyName?',
            component: lazy(() => import('./RecruitingAgencysManagement/RecruitingAgency/NewRecruitingAgency.js'))
        },
        {
            path: '/apps/recruitingAgency-management/recruitingAgencys',
            component: lazy(() => import('./RecruitingAgencysManagement/RecruitingAgencys/RecruitingAgencys'))
        },
        {
            path: '/apps/recruitingAgency-management/:recruitingAgencyId',
            component: lazy(() => import('./RecruitingAgencysManagement/RecruitingAgency/NewRecruitingAgency'))
        },

    ]
}

export default ramsRouteConfig;