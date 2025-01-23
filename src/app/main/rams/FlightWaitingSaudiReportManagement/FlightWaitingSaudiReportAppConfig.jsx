import { Navigate } from 'react-router-dom';
import FlightWaitingSaudiReportApp from './FlightWaitingSaudiReportApp';
import FlightWaitingSaudiReport from './flightWaitingSaudiReport/FlightWaitingSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const FlightWaitingSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightWaitingSaudiReport',
      element: <FlightWaitingSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightWaitingSaudiReports' />,
        },

        {
          path: 'flightWaitingSaudiReports/:flightWaitingSaudiReportId?/*',
          element: <FlightWaitingSaudiReport />,
        },
      ],
    },
  ],
};
export default FlightWaitingSaudiReportAppConfig;
