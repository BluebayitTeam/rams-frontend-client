import { Navigate } from 'react-router-dom';
import OfficeWorkApp from './OfficeWorkApp';
import OfficeWork from './officeWork/OfficeWork';

/**
 * The E-Commerce app configuration.
 */
const OfficeWorkAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/officeWork',
			element: <OfficeWorkApp />,
			children: [
				{
					path: '',
					element: <Navigate to="officeWorks" />
				},

				{
					path: 'officeWorks/:officeWorkId/:fromSearch?',
					element: <OfficeWork />
				}
			]
		}
	]
};
export default OfficeWorkAppConfig;
