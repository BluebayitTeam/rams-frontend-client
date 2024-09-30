import { Navigate } from 'react-router-dom';
import TicketPostingApp from './TicketPostingApp';
import TicketPosting from './ticketPosting/TicketPosting';

/**
 * The E-Commerce app configuration.
 */
const TicketPostingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ticketPosting',
			element: <TicketPostingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ticketPostings" />
				},

				{
					path: 'ticketPostings/:ticketPostingId?/*',
					element: <TicketPosting />
				}
			]
		}
	]
};
export default TicketPostingAppConfig;
