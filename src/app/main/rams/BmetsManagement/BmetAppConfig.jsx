import { Navigate } from 'react-router-dom';
import BmetApp from './BmetApp';
import Bmet from './bmet/Bmet';

/**
 * The E-Commerce app configuration.
 */
const BmetAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/bmet',
			element: <BmetApp />,
			children: [
				{
					path: '',
					element: <Navigate to="bmets" />
				},

				{
					path: 'bmets/:bmetId?/*',
					element: <Bmet />
				}
			]
		}
	]
};
export default BmetAppConfig;
