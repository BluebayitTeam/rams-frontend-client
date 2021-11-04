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
        ]
    }
];

export default navigationConfig;
