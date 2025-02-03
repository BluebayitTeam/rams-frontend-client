import { Navigate } from 'react-router-dom';
import FlightMalaysiaReportApp from './FlightMalaysiaReportApp';
import FlightMalaysiaReport from './flightMalaysiaReport/FlightMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const FlightMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightMalaysiaReport',
      element: <FlightMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightMalaysiaReports' />,
        },

        {
          path: 'flightMalaysiaReports/:flightMalaysiaReportId?/*',
          element: <FlightMalaysiaReport />,
        },
      ],
    },
  ],
};
export default FlightMalaysiaReportAppConfig;
