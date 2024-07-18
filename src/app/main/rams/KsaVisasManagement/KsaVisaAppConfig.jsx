import { Navigate } from 'react-router-dom';
import KsaVisaApp from './KsaVisaApp';
import KsaVisa from './ksaVisa/KsaVisa';

/**
 * The E-Commerce app configuration.
 */
const KsaVisaAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ksaVisa',
			element: <KsaVisaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ksaVisas" />
				},

				{
					path: 'ksaVisas/:ksaVisaId?/*',
					element: <KsaVisa />
				}
			]
		}
	]
};
export default KsaVisaAppConfig;
