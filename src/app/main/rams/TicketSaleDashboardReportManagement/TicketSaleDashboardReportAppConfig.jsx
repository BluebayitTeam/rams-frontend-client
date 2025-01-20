import { Navigate } from 'react-router-dom';
import TicketSaleDashboardReportApp from './TicketSaleDashboardReportApp';
import TicketSaleDashboardsReport from './ticketSaleDashboard/TicketSaleDashboardReport';

/**
 * The E-Commerce app configuration.
 */
const TicketSaleDashboardReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketSaleDashboardReport',
      element: <TicketSaleDashboardReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketSaleDashboardReports' />,
        },

        {
          path: 'ticketSaleDashboardReports/:ticketSaleDashboardReportId?/*',
          element: <TicketSaleDashboardsReport />,
        },
      ],
    },
  ],
};
export default TicketSaleDashboardReportAppConfig;
