import { Navigate } from 'react-router-dom';
import PermissionApp from './PermissionApp';
import Permissions from './permissions/Permissions';
import Permission from './permission/Permission';

/**
 * The E-Commerce app configuration.
 */
const PermissionAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/permission',
			element: <PermissionApp />,
			children: [
				{
					path: '',
					element: <Navigate to="permissions" />
				},
				{
					path: 'permissions',
					element: <Permissions />
				},
				{
					path: 'permissions/:permissionId/*',
					element: <Permission />
				}
			]
		}
	]
};
export default PermissionAppConfig;
