import { Navigate } from 'react-router-dom';
import AuthorizeApp from './AuthorizeApp';
import Authorizes from './authorizes/Authorizes';

/**
 * The E-Commerce app configuration.
 */
const AuthorizeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/authorize',
			element: <AuthorizeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="authorizes" />
				},
				{
					path: 'authorizes',
					element: <Authorizes />
				},
				// {
				// 	path: 'authorizes/:authorizeId/*',
				// 	element: <Authorize />
				// }
			]
		}
	]
};
export default AuthorizeAppConfig;
