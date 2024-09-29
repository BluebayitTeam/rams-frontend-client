import { Navigate } from 'react-router-dom';
import TicketDeputeApp from './TicketDeputeApp';
import TicketDeputes from './ticketDeputes/TicketDeputes';
import TicketDepute from './ticketDepute/TicketDepute';

/**
 * The E-Commerce app configuration.
 */
const TicketDeputeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ticketDepute',
			element: <TicketDeputeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ticketDeputes" />
				},
				{
					path: 'ticketDeputes',
					element: <TicketDeputes />
				},
				{
					path: 'ticketDeputes/:ticketDeputeId/*',
					element: <TicketDepute />
				}
			]
		}
	]
};
export default TicketDeputeAppConfig;
