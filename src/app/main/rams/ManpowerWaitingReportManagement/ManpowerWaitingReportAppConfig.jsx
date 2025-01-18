import { Navigate } from 'react-router-dom';
import ManpowerWaitingReportApp from './ManpowerWaitingReportApp';
import ManpowerWaitingsReport from './manpowerWaiting/ManpowerWaitingReport';

/**
 * The E-Commerce app configuration.
 */
const ManpowerWaitingReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/manpowerWaitingReport',
      element: <ManpowerWaitingReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='manpowerWaitingReports' />,
        },

        {
          path: 'manpowerWaitingReports/:manpowerWaitingReportId?/*',
          element: <ManpowerWaitingsReport />,
        },
      ],
    },
  ],
};
export default ManpowerWaitingReportAppConfig;
