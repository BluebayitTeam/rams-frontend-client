import { Navigate } from 'react-router-dom';
import FlightFlightDoneReportApp from './FlightFlightDoneReportApp';
import FlightFlightDonesReport from './flightFlightDone/FlightFlightDoneReport';

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
