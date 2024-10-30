import { Navigate } from 'react-router-dom';
import TicketsalesummeryfilterdataReportApp from './TicketsalesummeryfilterdataReportApp';
import TicketsalesummeryfilterdatasReport from './ticketsalesummeryfilterdata/TicketsalesummeryfilterdataReport';

/**
 * The E-Commerce app configuration.
 */
const TicketsalesummeryfilterdataReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketsalesummeryfilterdataReport',
      element: <TicketsalesummeryfilterdataReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketsalesummeryfilterdataReports' />,
        },

        {
          path: 'ticketsalesummeryfilterdataReports/:ticketId?/:airwayId?/:agentId?/:issuepersonId?',
          element: <TicketsalesummeryfilterdatasReport />,
        },
      ],
    },
  ],
};
export default TicketsalesummeryfilterdataReportAppConfig;
