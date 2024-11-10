import { Navigate } from 'react-router-dom';
import PassengerStatusOverviewReport from './passengerStatusOverviewReport/passengerStatusOverviewReport';
import PassengerStatusOverviewReportApp from './passengerStatusOverviewReportApp';

/**
 * The E-Commerce app configuration.
 */
const PassengerStatusOverviewReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerStatusOverviewReport',
      element: <PassengerStatusOverviewReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerStatusOverviewReports' />,
        },

        {
          path: 'passengerStatusOverviewReports/:passengerStatusOverviewReportId?/*',
          element: <PassengerStatusOverviewReport />,
        },
      ],
    },
  ],
};
export default PassengerStatusOverviewReportAppConfig;
