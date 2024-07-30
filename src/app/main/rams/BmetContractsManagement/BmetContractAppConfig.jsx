import { Navigate } from 'react-router-dom';
import BmetContractApp from './BmetContractContractApp';
import BmetContract from './bmetContractContract/BmetContractContract';

/**
 * The E-Commerce app configuration.
 */
const BmetContractAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/bmetContract',
			element: <BmetContractApp />,
			children: [
				{
					path: '',
					element: <Navigate to="bmetContracts" />
				},

				{
					path: 'bmetContracts/:bmetContractId?/*',
					element: <BmetContract />
				}
			]
		}
	]
};
export default BmetContractAppConfig;
