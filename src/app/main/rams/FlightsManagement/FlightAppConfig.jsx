import { Navigate } from 'react-router-dom';
import FlightApp from './FlightApp';
import Flight from './flight/Flight';

/**
 * The E-Commerce app configuration.
 */
const FlightAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/flight-management',
			element: <FlightApp />,
			children: [
				{
					path: '',
					element: <Navigate to="flights" />
				},

				{
					path: 'flights/:flightId/:fromSearch?',
					
					element: <Flight />
				}
			]
		}
	]
};
export default FlightAppConfig;
