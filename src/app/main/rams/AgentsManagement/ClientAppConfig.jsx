import { Navigate } from 'react-router-dom';
import ClientApp from './ClientApp';
import Clients from './agents/Agents';
import Client from './client/Client';

/**
 * The E-Commerce app configuration.
 */
const ClientAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/client',
			element: <ClientApp />,
			children: [
				{
					path: '',
					element: <Navigate to="clients" />
				},
				{
					path: 'clients',
					element: <Clients />
				},
				{
					path: 'clients/success',
					element: <Clients />
				},
				{
					path: 'clients/:clientId/*',
					element: <Client />
				}
			]
		}
	]
};
export default ClientAppConfig;
