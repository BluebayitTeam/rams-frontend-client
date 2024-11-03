import { Navigate } from 'react-router-dom';
import EmbassyReportApp from './EmbassyReportApp';
import EmbassyReport from './embassyReport/EmbassyReport';

/**
 * The E-Commerce app configuration.
 */
const EmbassyReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/embassyReport',
      element: <EmbassyReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='embassyReports' />,
        },

        {
          path: 'embassyReports/:embassyReportId?/*',
          element: <EmbassyReport />,
        },
      ],
    },
  ],
};
export default EmbassyReportAppConfig;
