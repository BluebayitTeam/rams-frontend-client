import { Navigate } from 'react-router-dom';
import PassengerReportApp from './PassengerReportApp';
import PassengerReport from './passengerReport/PassengerReport';

/**
 * The E-Commerce app configuration.
 */
const PassengerReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerReport',
      element: <PassengerReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerReports' />,
        },

        {
          path: 'passengerReports/:passengerReportId?/*',
          element: <PassengerReport />,
        },
      ],
    },
  ],
};
export default PassengerReportAppConfig;
