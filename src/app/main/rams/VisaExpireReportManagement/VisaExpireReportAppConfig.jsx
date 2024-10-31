import { Navigate } from 'react-router-dom';
import VisaExpireReportApp from './VisaExpireReportApp';
import VisaExpiresReport from './visaExpire/VisaExpireReport';

/**
 * The E-Commerce app configuration.
 */
const VisaExpireReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaExpireReport',
      element: <VisaExpireReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaExpireReports' />,
        },

        {
          path: 'visaExpireReports/:noOfDays?/*',
          element: <VisaExpiresReport />,
        },
      ],
    },
  ],
};
export default VisaExpireReportAppConfig;
