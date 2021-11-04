import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
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
    }
];

export default navigationConfig;
