import { Navigate } from 'react-router-dom';
import EmbassyExpireReportApp from './EmbassyExpireReportApp';
import EmbassyExpiresReport from './embassyExpire/EmbassyExpireReport';

/**
 * The E-Commerce app configuration.
 */
const EmbassyExpireReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/embassyExpireReport',
      element: <EmbassyExpireReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='embassyExpireReports' />,
        },

        {
          path: 'embassyExpireReports/:noOfDays?/*',
          element: <EmbassyExpiresReport />,
        },
      ],
    },
  ],
};
export default EmbassyExpireReportAppConfig;
