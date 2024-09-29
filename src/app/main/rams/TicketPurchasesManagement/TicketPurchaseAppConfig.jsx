import { Navigate } from 'react-router-dom';
import TicketPurchaseApp from './TicketPurchaseApp';
import TicketPurchases from './ticketPurchases/TicketPurchases';
import TicketPurchase from './ticketPurchase/TicketPurchase';

/**
 * The E-Commerce app configuration.
 */
const TicketPurchaseAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ticketPurchase',
			element: <TicketPurchaseApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ticketPurchases" />
				},
				{
					path: 'ticketPurchases',
					element: <TicketPurchases />
				},
				{
					path: 'ticketPurchases/:ticketPurchaseId/*',
					element: <TicketPurchase />
				}
			]
		}
	]
};
export default TicketPurchaseAppConfig;
