import Users from './rams/UsersManagement/users/Users';

const ramsRouteConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/all-user',
			element: <Users />
		}
	]
};

export default ramsRouteConfig;
