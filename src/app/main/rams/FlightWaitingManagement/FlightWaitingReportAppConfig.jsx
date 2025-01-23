import { Navigate } from 'react-router-dom';
import FlightWaitingReportApp from './FlightWaitingReportApp';
import FlightWaitingsReport from './flightWaiting/FlightWaitingReport';

/**
 * The E-Commerce app configuration.
 */
const FlightWaitingReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightWaitingReport',
      element: <FlightWaitingReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightWaitingReports' />,
        },

        {
          path: 'flightWaitingReports/:flightWaitingReportId?/*',
          element: <FlightWaitingsReport />,
        },
      ],
    },
  ],
};
export default FlightWaitingReportAppConfig;
