import { Navigate } from 'react-router-dom';
import EvisaExpireReportApp from './EevisaExpireReportApp';
import EvisaExpiresReport from './eevisaExpire/EevisaExpireReport';

/**
 * The E-Commerce app configuration.
 */
const EvisaExpireReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/evisaExpireReport',
      element: <EvisaExpireReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='evisaExpireReports' />,
        },

        {
          path: 'evisaExpireReports/:noOfDays?/*',
          element: <EvisaExpiresReport />,
        },
      ],
    },
  ],
};
export default EvisaExpireReportAppConfig;
