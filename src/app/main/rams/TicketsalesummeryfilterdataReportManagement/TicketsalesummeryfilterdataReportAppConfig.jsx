import { Navigate } from 'react-router-dom';
import TicketsalesummeryfilterdataReportApp from './TicketsalesummeryfilterdataReportApp';
import TicketsalesummeryfilterdatasReport from './ticketsalesummeryfilterdata/TicketsalesummeryfilterdatasReport';

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
          path: 'ticketsalesummeryfilterdataReports/:ticketsalesummeryfilterdataReportId?/*',
          element: <TicketsalesummeryfilterdatasReport />,
        },
      ],
    },
  ],
};
export default TicketsalesummeryfilterdataReportAppConfig;
