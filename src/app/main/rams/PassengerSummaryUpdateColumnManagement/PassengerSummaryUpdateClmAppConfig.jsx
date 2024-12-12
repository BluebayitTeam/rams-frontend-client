import { Navigate } from 'react-router-dom';
import PassengerSummaryUpdateClmApp from './PassengerSummaryUpdateClmApp';
import PassengerSummaryUpdateClms from './passengerSummaryUpdateClms/PassengerSummaryUpdateClms';
import PassengerSummaryUpdateClm from './passengerSummaryUpdateClm/PassengerSummaryUpdateClm';

/**
 * The E-Commerce app configuration.
 */
const PassengerSummaryUpdateClmAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/passengerSummaryUpdateClm',
			element: <PassengerSummaryUpdateClmApp />,
			children: [
				{
					path: '',
					element: <Navigate to="passengerSummaryUpdateClms" />
				},
				{
					path: 'passengerSummaryUpdateClms',
					element: <PassengerSummaryUpdateClms />
				},
				{
					path: 'passengerSummaryUpdateClms/:passengerSummaryUpdateClmId/*',
					element: <PassengerSummaryUpdateClm />
				}
			]
		}
	]
};
export default PassengerSummaryUpdateClmAppConfig;
