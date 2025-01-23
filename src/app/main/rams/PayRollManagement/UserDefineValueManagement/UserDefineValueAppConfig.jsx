import { Navigate } from 'react-router-dom';
import UserDefineValue from './userDefineValue/UserDefineValue';
import UserDefineValueApp from './UserDefineValueApp';
import UserDefineValues from './userDefineValues/UserDefineValues';

/**
 * The E-Commerce app configuration.
 */

// apps/userDefineValue/userDefineValues

const UserDefineValueAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/userDefineValue',
			element: <UserDefineValueApp />,
			children: [
				{
					path: '',
					element: <Navigate to="userDefineValues" />
				},
				{
					path: 'userDefineValues',
					element: <UserDefineValues />
				},
				{
					path: 'userDefineValues/:userDefineValueId/*',
					element: <UserDefineValue />
				}
			]
		}
	]
};
export default UserDefineValueAppConfig;
