import { Navigate } from 'react-router-dom';
import BmetVerifyApp from './BmetVerifyApp';
import BmetVerify from './bmetVerify/BmetVerify';

/**
 * The E-Commerce app configuration.
 */
const BmetVerifyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/bmetVerify',
			element: <BmetVerifyApp />,
			children: [
				{
					path: '',
					element: <Navigate to="bmetVerifys" />
				},

				{
					path: 'bmetVerifys/:bmetVerifyId?/*',
					element: <BmetVerify />
				}
			]
		}
	]
};
export default BmetVerifyAppConfig;
