import { Navigate } from 'react-router-dom';
import FlightReportApp from './FlightReportApp';
import FlightReport from './flightReport/FlightReport';

/**
 * The E-Commerce app configuration.
 */
const FlightReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightReport',
      element: <FlightReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightReports' />,
        },

        {
          path: 'flightReports/:flightReportId?/*',
          element: <FlightReport />,
        },
      ],
    },
  ],
};
export default FlightReportAppConfig;
