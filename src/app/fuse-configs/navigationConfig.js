import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
    //employee
    {
        id: 1,
        title: 'Employee',
        translate: 'Employee Management',
        type: 'collapse',
        icon: 'people',
        url: '/apps/employee-management/employees',
        children: [
            //employees
            {
                id: 2,
                title: 'Emloyees',
                translate: 'Employees',
                type: 'item',
                url: '/apps/employee-management/employees',
                exact: true
            },
            //departments
            {
                id: 3,
                title: 'Departments',
                translate: 'Departments',
                type: 'item',
                url: '/apps/department-management/departments',
                exact: true
            },
            //qualifications
            {
                id: 4,
                title: 'Qualifications',
                translate: 'Qualifications',
                type: 'item',
                url: '/apps/qualification-management/qualifications',
                exact: true
            },
        ]
    },

    //setting
    {
        id: 5,
        title: 'Settings',
        translate: 'Settings',
        type: 'collapse',
        icon: 'settings',
        url: '',
        exact: true,
        children: [
            //cities
            {
                id: 6,
                title: 'Districts',
                translate: 'Districts',
                type: 'item',
                url: '/apps/city-management/cities',
                exact: true
            },
            //thanas
            {
                id: 7,
                title: 'Police Stations',
                translate: 'Police Stations',
                type: 'item',
                url: '/apps/thana-management/thanas',
                exact: true
            },
            //branch
            {
                id: 8,
                title: 'branches',
                translate: 'Branches',
                type: 'item',
                url: '/apps/branch-management/branchs',
                exact: true
            },
            //site setting
            {
                id: 9,
                title: 'siteSettings',
                translate: 'Site Settings',
                type: 'item',
                url: '/apps/sitesettings-management/sitesettings',
                exact: true
            },
            //passengerType
            {
                id: 'passengerTypes',
                title: 'PassengerTypes',
                translate: 'PassengerTypes',
                type: 'item',
                url: '/apps/passengerType-management/passengerTypes',
                exact: true
            },
            //currentStatus
            {
                id: 'currentStatuss',
                title: 'Current Statuses',
                translate: 'Current Statuses',
                type: 'item',
                url: '/apps/currentStatus-management/currentStatuss',
                exact: true
            },
            //profession
            {
                id: 'professions',
                title: 'Professions',
                translate: 'Professions',
                type: 'item',
                url: '/apps/profession-management/professions',
                exact: true
            }
        ]
    },

    //user config
    {
        id: 10,
        title: 'User Config',
        translate: 'User Config',
        type: 'collapse',
        icon: 'people',
        url: '',
        exact: true,
        children: [
            //permissions
            {
                id: 11,
                title: 'Permissions',
                translate: 'Permissions',
                type: 'item',
                url: '/apps/permission-management/permissions',
                exact: true
            },
            //roles
            {
                id: 12,
                title: 'roles',
                translate: 'Roles',
                type: 'item',
                url: '/apps/roles-management/roles'
            },
            //users
            {
                id: 13,
                title: 'userslist',
                translate: 'User List',
                type: 'item',
                url: '/apps/users-management/userslist',
                exact: true
            },
            //menu
            {
                id: 14,
                title: 'Menus',
                translate: 'Menus',
                type: 'item',
                url: '/apps/menu-management/menus',
                exact: true
            },
            //roleMenu
            {
                id: 15,
                title: 'RoleMenus',
                translate: 'RoleMenus',
                type: 'item',
                url: '/apps/roleMenu-management/roleMenus',
                exact: true
            },

        ]
    },
    //agent
    {
        id: 16,
        title: 'Agent',
        translate: 'Agent',
        type: 'collapse',
        icon: 'people',
        url: '',
        exact: true,
        children: [
            //agent list
            {
                id: 'agentList',
                title: 'Agent List',
                translate: 'Agent List',
                type: 'item',
                url: '/apps/agent-management/agents',
                exact: true
            }
        ]
    }
];

export default navigationConfig;
