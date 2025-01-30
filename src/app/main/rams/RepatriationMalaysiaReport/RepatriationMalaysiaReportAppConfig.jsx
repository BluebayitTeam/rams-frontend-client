import { Navigate } from 'react-router-dom';
import RepatriationMalaysiaReportApp from './RepatriationMalaysiaReportApp';
import RepatriationMalaysiasReport from './repatriation/RepatriationMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const RepatriationMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/repatriationMalaysiaReport',
      element: <RepatriationMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='repatriationMalaysiaReports' />,
        },

        {
          path: 'repatriationMalaysiaReports/:repatriationMalaysiaReportId?/*',
          element: <RepatriationMalaysiasReport />,
        },
      ],
    },
  ],
};
export default RepatriationMalaysiaReportAppConfig;
