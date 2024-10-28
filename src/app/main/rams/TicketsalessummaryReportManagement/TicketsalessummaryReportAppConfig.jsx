import { Navigate } from 'react-router-dom';
import TicketsalessummaryReportApp from './TicketsalessummaryReportApp';
import TicketsalessummarysReport from './ticketsalessummaryReport/TicketsalessummarysReport';

/**
 * The E-Commerce app configuration.
 */
const TicketsalessummaryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketsalessummaryReport',
      element: <TicketsalessummaryReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketsalessummaryReports' />,
        },

        {
          path: 'ticketsalessummaryReports/:ticketsalessummaryReportId?/*',
          element: <TicketsalessummarysReport />,
        },
      ],
    },
  ],
};
export default TicketsalessummaryReportAppConfig;
