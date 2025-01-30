import { Navigate } from 'react-router-dom';
import TraningMalaysiaReportApp from './TraningMalaysiaReportApp';
import TraningMalaysiasReport from './traning/TraningMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const TraningMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/traningMalaysiaReport',
      element: <TraningMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='traningMalaysiaReports' />,
        },

        {
          path: 'traningMalaysiaReports/:traningMalaysiaReportId?/*',
          element: <TraningMalaysiasReport />,
        },
      ],
    },
  ],
};
export default TraningMalaysiaReportAppConfig;
