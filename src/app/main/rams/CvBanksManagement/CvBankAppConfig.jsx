import { Navigate } from 'react-router-dom';
import CvBankApp from './CvBankApp';
import CvBanks from './cvBanks/CvBanks';
import CvBank from './cvBank/CvBank';

/**
 * The E-Commerce app configuration.
 */
const CvBankAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/cvBank',
			element: <CvBankApp />,
			children: [
				{
					path: '',
					element: <Navigate to="cvBanks" />
				},
				{
					path: 'cvBanks',
					element: <CvBanks />
				},

				{
					path: 'cvBanks/:cvBankId/*',
					element: <CvBank />
				}
			]
		}
	]
};
export default CvBankAppConfig;
