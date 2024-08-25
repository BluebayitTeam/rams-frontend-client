import { Navigate } from 'react-router-dom';
import GdsApp from './GdsApp';
import Gdss from './gdss/Gdss';
import Gds from './gds/Gds';

/**
 * The E-Commerce app configuration.
 */
const GdsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/gds',
			element: <GdsApp />,
			children: [
				{
					path: '',
					element: <Navigate to="gdss" />
				},
				{
					path: 'gdss',
					element: <Gdss />
				},
				{
					path: 'gdss/:gdsId/*',
					element: <Gds />
				}
			]
		}
	]
};
export default GdsAppConfig;
