import { Navigate } from 'react-router-dom';
import ReportClmApp from './PassengerSummaryUpdateClmApp';
import ReportClm from './passengerSummaryUpdateClm/PassengerSummaryUpdateClm';

/**
 * The E-Commerce app configuration.
 */
const ReportClmAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/reportClm',
      element: <ReportClmApp />,
      children: [
        {
          path: '',
          element: <Navigate to='reportClms' />,
        },

        {
          path: 'reportClms/:reportClmId/*',
          element: <ReportClm />,
        },
      ],
    },
  ],
};
export default ReportClmAppConfig;
