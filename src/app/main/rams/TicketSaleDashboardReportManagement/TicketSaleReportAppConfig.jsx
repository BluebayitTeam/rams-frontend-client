import { Navigate } from 'react-router-dom';
import TicketSaleReportApp from './TicketSaleReportApp';
import TicketSalesReport from './ticketSale/TicketSaleReport';

/**
 * The E-Commerce app configuration.
 */
const TicketSaleReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketSaleReport',
      element: <TicketSaleReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketSaleReports' />,
        },

        {
          path: 'ticketSaleReports/:ticketSaleReportId?/*',
          element: <TicketSalesReport />,
        },
      ],
    },
  ],
};
export default TicketSaleReportAppConfig;
