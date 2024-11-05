import { Navigate } from 'react-router-dom';
import PassengerSumaryReportApp from './PassengerSumaryReportApp';
import PassengerSumaryReport from './passengerSumaryReport/PassengerSumaryReport';

/**
 * The E-Commerce app configuration.
 */
const PassengerSumaryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerSumaryReport',
      element: <PassengerSumaryReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerSumaryReports' />,
        },

        {
          path: 'passengerSumaryReports/:passengerSumaryReportId?/*',
          element: <PassengerSumaryReport />,
        },
      ],
    },
  ],
};
export default PassengerSumaryReportAppConfig;
