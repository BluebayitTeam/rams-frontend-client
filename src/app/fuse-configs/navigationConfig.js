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
            },
            //recruitingAgency
            {
                id: 'recruitingAgencies',
                title: 'Recruiting Agencies',
                translate: 'Recruiting Agencies',
                type: 'item',
                url: '/apps/recruitingAgency-management/recruitingAgencys',
                exact: true
            },
            //medicalCenter
            {
                id: 'medicalCenters',
                title: 'Medical Centers',
                translate: 'Medical Centers',
                type: 'item',
                url: '/apps/medicalCenter-management/medicalCenters',
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
            },
            //demand
            {
                id: 'demands',
                title: 'Demands',
                translate: 'Demands',
                type: 'item',
                url: '/apps/demand-management/demands',
                exact: true
            },
            //visaEntry
            {
                id: 'visaEntry',
                title: 'Visa Enty',
                translate: 'Visa Enty',
                type: 'item',
                url: '/apps/visaEntry-management/visaEntrys',
                exact: true
            }
        ]
    },
    //passenger
    {
        id: 17,
        title: 'Passengers',
        translate: 'Passengers',
        type: 'collapse',
        icon: 'people',
        url: '',
        exact: true,
        children: [
            //recruiting
            {
                id: 'recruiting',
                title: 'Recruitings',
                translate: 'Recruitings',
                type: 'item',
                url: '/apps/passenger-management/passengers/recruiting',
                exact: true
            },
            //processing
            {
                id: 'processing',
                title: 'Processings',
                translate: 'Processings',
                type: 'item',
                url: '/apps/passenger-management/passengers/processing',
                exact: true
            },
            //hajj
            {
                id: 'hajj',
                title: 'Hajjs',
                translate: 'Hajjs',
                type: 'item',
                url: '/apps/passenger-management/passengers/hajj',
                exact: true
            },
            //Umrah
            {
                id: 'umrah',
                title: 'Umrahs',
                translate: 'Umrahs',
                type: 'item',
                url: '/apps/passenger-management/passengers/umrah',
                exact: true
            },
            //travel
            {
                id: 'travel',
                title: 'Travels',
                translate: 'Travels',
                type: 'item',
                url: '/apps/passenger-management/passengers/travel',
                exact: true
            },
            //studennt
            {
                id: 'student',
                title: 'Students',
                translate: 'Students',
                type: 'item',
                url: '/apps/passenger-management/passengers/student',
                exact: true
            },
        ]
    },
    //services
    {
        id: "services",
        title: 'Services',
        translate: 'Services',
        type: 'collapse',
        icon: 'people',
        url: '',
        exact: true,
        children: [
            //medical
            {
                id: 'medical',
                title: 'Medical',
                translate: 'Medical',
                type: 'item',
                url: '/apps/medical-management/medical/new',
                exact: true
            },
            //embassy
            {
                id: 'embassy',
                title: 'Embassy',
                translate: 'Embassy',
                type: 'item',
                url: '/apps/embassy-management/embassy/new',
                exact: true
            },
        ]
    }
];

export default navigationConfig;
