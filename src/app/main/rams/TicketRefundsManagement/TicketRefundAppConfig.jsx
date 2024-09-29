import { Navigate } from 'react-router-dom';
import TicketRefundApp from './TicketRefundApp';
import TicketRefunds from './ticketRefunds/TicketRefunds';
import TicketRefund from './ticketRefund/TicketRefund';

/**
 * The E-Commerce app configuration.
 */
const TicketRefundAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ticketRefund',
			element: <TicketRefundApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ticketRefunds" />
				},
				{
					path: 'ticketRefunds',
					element: <TicketRefunds />
				},
				{
					path: 'ticketRefunds/:ticketRefundId/*',
					element: <TicketRefund />
				}
			]
		}
	]
};
export default TicketRefundAppConfig;
