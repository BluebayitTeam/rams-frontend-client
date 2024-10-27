import { Navigate } from 'react-router-dom';
import TicketrefundReportApp from './TicketrefundReportApp';
import TicketrefundReport from './ticketrefundReport/TicketrefundReport';

/**
 * The E-Commerce app configuration.
 */
const TicketrefundReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketrefundReport',
      element: <TicketrefundReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketrefundReports' />,
        },

        {
          path: 'ticketrefundReports/:ticketrefundReportId?/*',
          element: <TicketrefundReport />,
        },
      ],
    },
  ],
};
export default TicketrefundReportAppConfig;
