import { Navigate } from 'react-router-dom';
import ClientTypeApp from './ClientTypeApp';
import ClientTypes from './clientTypes/ClientTypes';
import ClientType from './clientType/ClientType';

/**
 * The E-Commerce app configuration.
 */
const ClientTypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/clientType',
			element: <ClientTypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="clientTypes" />
				},
				{
					path: 'clientTypes',
					element: <ClientTypes />
				},
				{
					path: 'clientTypes/:clientTypeId/*',
					element: <ClientType />
				}
			]
		}
	]
};
export default ClientTypeAppConfig;
