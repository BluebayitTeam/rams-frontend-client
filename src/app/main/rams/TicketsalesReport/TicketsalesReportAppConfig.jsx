import { Navigate } from 'react-router-dom';
import TicketsalesReportApp from './TicketsalesReportApp';
import TicketsalesReport from './ticketsalesReport/TicketsalesReport';

/**
 * The E-Commerce app configuration.
 */
const TicketsalesReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketsalesReport',
      element: <TicketsalesReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketsalesReports' />,
        },

        {
          path: 'ticketsalesReports/:ticketsalesReportId?/*',
          element: <TicketsalesReport />,
        },
      ],
    },
  ],
};
export default TicketsalesReportAppConfig;
