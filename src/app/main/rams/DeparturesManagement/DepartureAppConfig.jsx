import { Navigate } from 'react-router-dom';
import DepartureApp from './DepartureApp';
import Departure from './departure/Departure';

/**
 * The E-Commerce app configuration.
 */
const DepartureAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/departure',
			element: <DepartureApp />,
			children: [
				{
					path: '',
					element: <Navigate to="departures" />
				},

				{
					path: 'departures/:departureId?/*',
					element: <Departure />
				}
			]
		}
	]
};
export default DepartureAppConfig;
