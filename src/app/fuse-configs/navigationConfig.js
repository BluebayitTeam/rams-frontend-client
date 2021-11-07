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
        id: 'employee',
        title: 'Employee',
        translate: 'Employee Management',
        type: 'collapse',
        icon: 'people',
        url: '/apps/employee-management/employees',
        children: [
            //employees
            {
                id: 'employees',
                title: 'Emloyees',
                translate: 'Employees',
                type: 'item',
                url: '/apps/employee-management/employees',
                exact: true
            },
            //departments
            {
                id: 'departments',
                title: 'Departments',
                translate: 'Departments',
                type: 'item',
                url: '/apps/department-management/departments',
                exact: true
            },
            //qualifications
            {
                id: 'qualifications',
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
        id: 'Settings',
        title: 'Settings',
        translate: 'Settings',
        type: 'collapse',
        icon: 'settings',
        url: '/apps/dashboards/project',
        exact: true,
        children: [
            //cities
            {
                id: 'cities',
                title: 'Districts',
                translate: 'Districts',
                type: 'item',
                url: '/apps/city-management/cities',
                exact: true
            },
            //thanas
            {
                id: 'thanas',
                title: 'Police Stations',
                translate: 'Police Stations',
                type: 'item',
                url: '/apps/thana-management/thanas',
                exact: true
            },
            //branch
            {
                id: 'branches',
                title: 'branches',
                translate: 'Branches',
                type: 'item',
                url: '/apps/branch-management/branchs',
                exact: true
            },
            //site setting
            {
                id: 'sitesettings',
                title: 'siteSettings',
                translate: 'Site Settings',
                type: 'item',
                url: '/apps/sitesettings-management/sitesettings',
                exact: true
            },
        ]
    },

    //user config
    {
        id: 'userconfig',
        title: 'User Config',
        translate: 'User Config',
        type: 'collapse',
        icon: 'people',
        url: '/apps/dashboards/project',
        exact: true,
        children: [
            //permissions
            {
                id: 'permissions',
                title: 'Permissions',
                translate: 'Permissions',
                type: 'item',
                url: '/apps/permission-management/permissions',
                exact: true
            },
            //roles
            {
                id: 'roles',
                title: 'roles',
                translate: 'Roles',
                type: 'item',
                url: '/apps/roles-management/roles'
            },
            //users
            {
                id: 'userslist',
                title: 'userslist',
                translate: 'User List',
                type: 'item',
                url: '/apps/users-management/userslist',
                exact: true
            },

        ]
    }
];

export default navigationConfig;
