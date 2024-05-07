import { Navigate } from 'react-router-dom';
import PassengerColumnApp from './PassengerColumnApp';
import PassengerColumn from './passengerColumn/PassengerColumn';

/**
 * The E-Commerce app configuration.
 */
const PassengerColumnAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/passengerColumn',
			element: <PassengerColumnApp />,
			children: [
				{
					path: '',
					element: <Navigate to="passengerColumns" />
				},

				{
					path: 'passengerColumns/:passengerColumnId/*',
					element: <PassengerColumn />
				}
			]
		}
	]
};
export default PassengerColumnAppConfig;
