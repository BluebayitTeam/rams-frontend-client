import { Navigate } from 'react-router-dom';
import MofaReportApp from './MofaReportApp';
import MofaReport from './mofaReport/MofaReport';

/**
 * The E-Commerce app configuration.
 */
const MofaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/mofaReport',
      element: <MofaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='mofaReports' />,
        },

        {
          path: 'mofaReports/:mofaReportId?/*',
          element: <MofaReport />,
        },
      ],
    },
  ],
};
export default MofaReportAppConfig;
