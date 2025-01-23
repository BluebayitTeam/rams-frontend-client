import { Navigate } from 'react-router-dom';
import EmbassySaudiReportApp from './EmbassySaudiReportApp';
import EmbassySaudiReport from './embassySaudiReport/EmbassySaudiReport';

/**
 * The E-Commerce app configuration.
 */
const EmbassySaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/embassySaudiReport',
      element: <EmbassySaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='embassySaudiReports' />,
        },

        {
          path: 'embassySaudiReports/:embassySaudiReportId?/*',
          element: <EmbassySaudiReport />,
        },
      ],
    },
  ],
};
export default EmbassySaudiReportAppConfig;
