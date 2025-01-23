import { Navigate } from 'react-router-dom';
import MofaSaudiReportApp from './MofaSaudiReportApp';
import MofaSaudiReport from './mofaSaudiReport/MofaSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const MofaSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/mofaSaudiReport',
      element: <MofaSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='mofaSaudiReports' />,
        },

        {
          path: 'mofaSaudiReports/:mofaSaudiReportId?/*',
          element: <MofaSaudiReport />,
        },
      ],
    },
  ],
};
export default MofaSaudiReportAppConfig;
