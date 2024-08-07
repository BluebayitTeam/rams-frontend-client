import { Navigate } from 'react-router-dom';
import PassengerTypeApp from './PassengerTypeApp';
import PassengerTypes from './passengerTypes/PassengerTypes';
import PassengerType from './passengerType/PassengerType';

/**
 * The E-Commerce app configuration.
 */
const PassengerTypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/passengerType',
			element: <PassengerTypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="passengerTypes" />
				},
				{
					path: 'passengerTypes',
					element: <PassengerTypes />
				},
				{
					path: 'passengerTypes/:passengerTypeId/*',
					element: <PassengerType />
				}
			]
		}
	]
};
export default PassengerTypeAppConfig;
