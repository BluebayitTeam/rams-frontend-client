import { Navigate } from 'react-router-dom';
import TicketMalaysiaReportApp from './TicketMalaysiaReportApp';
import TicketMalaysiaReport from './TicketMalaysiaReport/TicketMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const TicketMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/TicketMalaysiaReport',
      element: <TicketMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='TicketMalaysiaReports' />,
        },

        {
          path: 'TicketMalaysiaReports/:TicketMalaysiaReportId?/*',
          element: <TicketMalaysiaReport />,
        },
      ],
    },
  ],
};
export default TicketMalaysiaReportAppConfig;
