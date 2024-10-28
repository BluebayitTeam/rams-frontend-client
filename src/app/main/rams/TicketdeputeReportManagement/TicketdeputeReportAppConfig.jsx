import { Navigate } from 'react-router-dom';
import TicketdeputeReportApp from './TicketdeputeReportApp';
import TicketdeputeReport from './ticketdeputeReport/TicketdeputeReport';

/**
 * The E-Commerce app configuration.
 */
const TicketdeputeReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketdeputeReport',
      element: <TicketdeputeReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketdeputeReports' />,
        },

        {
          path: 'ticketdeputeReports/:ticketdeputeReportId?/*',
          element: <TicketdeputeReport />,
        },
      ],
    },
  ],
};
export default TicketdeputeReportAppConfig;
