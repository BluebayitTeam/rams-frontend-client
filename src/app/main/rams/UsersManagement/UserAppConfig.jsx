import { Navigate } from 'react-router-dom';
import UserApp from './UserApp';
import Users from './users/Users';
import User from './user/User';

/**
 * The E-Commerce app configuration.
 */
const UserAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/user',
			element: <UserApp />,
			children: [
				{
					path: '',
					element: <Navigate to="users" />
				},
				{
					path: 'users',
					element: <Users />
				},
				{
					path: 'users/:userId/*',
					element: <User />
				}
			]
		}
	]
};
export default UserAppConfig;
