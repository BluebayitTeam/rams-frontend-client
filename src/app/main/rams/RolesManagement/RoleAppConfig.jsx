import { Navigate } from 'react-router-dom';
import RoleApp from './RoleApp';
import Roles from './roles/Roles';
import Role from './role/Role';

/**
 * The E-Commerce app configuration.
 */
const RoleAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/role',
			element: <RoleApp />,
			children: [
				{
					path: '',
					element: <Navigate to="roles" />
				},
				{
					path: 'roles',
					element: <Roles />
				},
				{
					path: 'roles/:roleId/*',
					element: <Role />
				}
			]
		}
	]
};
export default RoleAppConfig;
