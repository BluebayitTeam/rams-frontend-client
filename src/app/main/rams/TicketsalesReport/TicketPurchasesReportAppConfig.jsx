import { Navigate } from 'react-router-dom';
import TicketPurchasesReportApp from './TicketPurchasesReportApp';
import TicketPurchasesReport from './ticketPurchasesReport/TicketPurchasesReport';

/**
 * The E-Commerce app configuration.
 */
const TicketPurchasesReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketPurchasesReport',
      element: <TicketPurchasesReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketPurchasesReports' />,
        },

        {
          path: 'ticketPurchasesReports/:ticketPurchasesReportId?/*',
          element: <TicketPurchasesReport />,
        },
      ],
    },
  ],
};
export default TicketPurchasesReportAppConfig;
