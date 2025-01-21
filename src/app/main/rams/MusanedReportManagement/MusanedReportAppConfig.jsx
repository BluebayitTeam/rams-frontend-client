import { Navigate } from 'react-router-dom';
import MusanedReportReportApp from './MusanedReportApp';
import MusanedReportsReport from './musanedReport/MusanedReport';

/**
 * The E-Commerce app configuration.
 */
const MusanedReportReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/musanedReportReport',
      element: <MusanedReportReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='musanedReportReports' />,
        },

        {
          path: 'musanedReportReports/:musanedReportReportId?/*',
          element: <MusanedReportsReport />,
        },
      ],
    },
  ],
};
export default MusanedReportReportAppConfig;
