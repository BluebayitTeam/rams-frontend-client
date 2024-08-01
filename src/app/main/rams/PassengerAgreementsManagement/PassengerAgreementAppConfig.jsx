import { Navigate } from 'react-router-dom';
import PassengerAgreementApp from './PassengerAgreementApp';
import PassengerAgreement from './passengerAgreement/PassengerAgreement';

/**
 * The E-Commerce app configuration.
 */
const PassengerAgreementAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/passengerAgreement',
			element: <PassengerAgreementApp />,
			children: [
				{
					path: '',
					element: <Navigate to="passengerAgreements" />
				},

				{
					path: 'passengerAgreements/:passengerAgreementId?/*',
					element: <PassengerAgreement />
				}
			]
		}
	]
};
export default PassengerAgreementAppConfig;
