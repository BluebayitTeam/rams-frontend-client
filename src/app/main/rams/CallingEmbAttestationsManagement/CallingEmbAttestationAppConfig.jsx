import { Navigate } from 'react-router-dom';
import CallingEmbAttestationApp from './CallingEmbAttestationApp';
import CallingEmbAttestation from './CallingEmbAttestation/CallingEmbAttestation';

/**
 * The E-Commerce app configuration.
 */
const CallingEmbAttestationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/callingEmbAttestation-management',
			element: <CallingEmbAttestationApp />,
			children: [
				{
					path: '',
					element: <Navigate to="callingEmbAttestations" />
				},

				{
					path: 'callingEmbAttestations/:callingEmbAttestationId/:fromSearch?',
					element: <CallingEmbAttestation />
				}
			]
		}
	]
};
export default CallingEmbAttestationAppConfig;
