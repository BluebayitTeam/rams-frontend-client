import { Navigate } from 'react-router-dom';
import KsaVisaManualApp from './KsaVisaManualApp';
import KsaVisaManual from './ksaVisaManual/KsaVisaManual';

/**
 * The E-Commerce app configuration.
 */
const KsaVisaManualAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ksaVisaManual',
			element: <KsaVisaManualApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ksaVisaManuals" />
				},

				{
					path: 'ksaVisaManuals/:ksaVisaManualId?/*',
					element: <KsaVisaManual />
				}
			]
		}
	]
};
export default KsaVisaManualAppConfig;
