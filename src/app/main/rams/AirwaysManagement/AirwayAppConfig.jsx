import { Navigate } from 'react-router-dom';
import AirwayApp from './AirwayApp';
import Airways from './airways/Airways';
import Airway from './airway/Airway';

/**
 * The E-Commerce app configuration.
 */
const AirwayAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/airway',
			element: <AirwayApp />,
			children: [
				{
					path: '',
					element: <Navigate to="airways" />
				},
				{
					path: 'airways',
					element: <Airways />
				},
				{
					path: 'airways/:airwayId/*',
					element: <Airway />
				}
			]
		}
	]
};
export default AirwayAppConfig;
