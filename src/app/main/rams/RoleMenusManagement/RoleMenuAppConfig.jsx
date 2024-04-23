import { Navigate } from 'react-router-dom';
import RoleMenuApp from './RoleMenuApp';
import RoleMenus from './roleMenus/RoleMenus';
import RoleMenu from './roleMenu/RoleMenu';

/**
 * The E-Commerce app configuration.
 */
const RoleMenuAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/roleMenu',
			element: <RoleMenuApp />,
			children: [
				{
					path: '',
					element: <Navigate to="roleMenus" />
				},
				{
					path: 'roleMenus',
					element: <RoleMenus />
				},
				{
					path: 'roleMenus/:roleMenuId/*',
					element: <RoleMenu />
				}
			]
		}
	]
};
export default RoleMenuAppConfig;
