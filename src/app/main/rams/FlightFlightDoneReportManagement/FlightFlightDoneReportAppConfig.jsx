import { Navigate } from 'react-router-dom';
import FlightFlightDonesReport from './flightFlightDone/FlightFlightDonelReport';
import FlightFlightDoneReportApp from './FlightFlightDoneReportApp';

/**
 * The E-Commerce app configuration.
 */
const FlightFlightDoneReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightFlightDoneReport',
      element: <FlightFlightDoneReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightFlightDoneReports' />,
        },

        {
          path: 'flightFlightDoneReports/:flightFlightDoneReportId?/*',
          element: <FlightFlightDonesReport />,
        },
      ],
    },
  ],
};
export default FlightFlightDoneReportAppConfig;
