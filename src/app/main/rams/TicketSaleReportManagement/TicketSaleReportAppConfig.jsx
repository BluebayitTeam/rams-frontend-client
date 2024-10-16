import { Navigate } from 'react-router-dom';
import TicketSaleReportApp from './TicketSaleApp';
import TicketSaleReport from './ticketSaleReport/TicketSaleReport';

/**
 * The E-Commerce app configuration.
 */
const TicketSaleReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ticketSaleReport',
			element: <TicketSaleReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ticketSaleReports" />
				},

				{
					path: 'ticketSaleReports/:ticketSaleReportId?/*',
					element: <TicketSaleReport />
				}
			]
		}
	]
};
export default TicketSaleReportAppConfig;
