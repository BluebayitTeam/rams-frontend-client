import { Navigate } from 'react-router-dom';
import CallingEmbAttestationApp from './CallingEmbAttestationApp';
import CallingEmbAttestation from './callingEmbAttestation/CallingEmbAttestation';

/**
 * The E-Commerce app configuration.
 */
const CallingEmbAttestationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/malaysiaStatus-management',
			element: <CallingEmbAttestationApp />,
			children: [
				{
					path: '',
					element: <Navigate to="malaysiaStatus" />
				},

				{
					path: 'malaysiaStatus/:callingEmbAttestationId/:fromSearch?',
					element: <CallingEmbAttestation />
				}
			]
		}
	]
};
export default CallingEmbAttestationAppConfig;
