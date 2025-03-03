import { Navigate } from 'react-router-dom';
import PassportExpireReportApp from './PassportExpireReportApp';
import PassportExpiresReport from './passportExpire/PassportExpireReport';

/**
 * The E-Commerce app configuration.
 */
const PassportExpireReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passportExpireReport',
      element: <PassportExpireReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passportExpireReports' />,
        },

        {
          path: 'passportExpireReports/:noOfDays?/*',
          element: <PassportExpiresReport />,
        },
      ],
    },
  ],
};
export default PassportExpireReportAppConfig;
