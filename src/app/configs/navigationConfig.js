import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'apps.employee',
		title: 'Employee',
		type: 'collapse',
		icon: 'heroicons-outline:home',
		translate: 'Employee',
		children: [
			// {
			// 	id: 'employee',
			// 	title: 'Employee',
			// 	type: 'item',
			// 	url: '/apps/employee/employees'
			// },
			{
				id: 'department',
				title: 'Department',
				type: 'item',
				url: '/apps/department/departments'
			},
			{
				id: 'designation',
				title: 'Designation',
				type: 'item',
				url: '/apps/designation/designations'
			}
		]
	},
	{
		id: 'apps.user-config',
		title: 'User Config',
		type: 'collapse',
		icon: 'heroicons-outline:support',
		children: [
			{
				id: 'menu',
				title: 'Menus',
				type: 'item',
				url: '/apps/menu/menus',
				end: true
			},
			{
				id: 'permission',
				title: 'Permission',
				type: 'item',
				url: '/apps/permission/permissions',
				end: true
			},
			{
				id: 'role',
				title: 'Role',
				type: 'item',
				url: '/apps/role/roles',
				end: true
			},
			{
				id: 'role_menu',
				title: 'Role Menu',
				type: 'item',
				url: '/apps/roleMenu/roleMenus',
				end: true
			},
			{
				id: 'user',
				title: 'User',
				type: 'item',
				url: '/apps/user/users',
				end: true
			}
		]
	},
	{
		id: 'apps.client',
		title: 'Client',
		type: 'collapse',
		icon: 'heroicons-outline:home',
		translate: 'Client',
		children: [
			{
				id: 'clientType',
				title: 'Client Type',
				type: 'item',
				url: '/apps/clientType/clientTypes'
			},
			{
				id: 'country',
				title: 'Country',
				type: 'item',
				url: '/apps/country/countrys'
			},
			{
				id: 'client',
				title: 'Client',
				type: 'item',
				url: '/apps/client/clients',
				end: true
			}
		]
	},
	{
		id: 'apps.agent',
		title: 'Agent',
		type: 'collapse',
		icon: 'heroicons-outline:home',
		translate: 'Agent',
		children: [
			{
				id: 'Agent',
				title: 'Agent',
				type: 'item',
				url: '/apps/agent/agents',
				end: true
			}
		]
	},
	// Tudo Work data add
	{
		id: 'apps.payment',
		title: 'Payment',
		type: 'collapse',
		icon: 'heroicons-outline:home',
		translate: 'Payment',
		children: [
			{
				id: 'Payment',
				title: 'Payment Detail',
				type: 'item',
				url: '/apps/paymentDetail/paymentDetails'
			},
			{
				id: 'subscriptionLoan',
				title: 'Subscription Loan',
				type: 'item',
				url: '/apps/subscriptionLoan/subscriptionLoans'
			}
		]
	},
	{
		id: 'support',
		title: 'Support',
		type: 'item',
		icon: 'heroicons-outline:clipboard-check',
		url: '/apps/support/supports'
	},
	{
		id: 'apps.package',
		title: 'Package',
		type: 'collapse',
		icon: 'heroicons-outline:home',
		translate: 'Package',
		children: [
			{
				id: 'packageType',
				title: 'Package',
				type: 'item',
				url: '/apps/packageType/packageTypes'
			},
			{
				id: 'featureDetail',
				title: 'Feature List',
				type: 'item',
				url: '/apps/featureDetail/featureDetails'
			}
		]
	}
];
export default navigationConfig;
