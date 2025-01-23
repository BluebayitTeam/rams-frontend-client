import { Navigate } from 'react-router-dom';
import TotalTicketReportApp from './TotalTicketReportApp';
import TotalTicketsReport from './totalTicket/TotalTicketReport';

/**
 * The E-Commerce app configuration.
 */
const TotalTicketReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/totalTicketReport',
      element: <TotalTicketReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='totalTicketReports' />,
        },

        {
          path: 'totalTicketReports/:totalTicketReportId?/*',
          element: <TotalTicketsReport />,
        },
      ],
    },
  ],
};
export default TotalTicketReportAppConfig;
