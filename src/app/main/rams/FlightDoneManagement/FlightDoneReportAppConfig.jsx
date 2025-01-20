import { Navigate } from 'react-router-dom';
import FlightDoneReportApp from './FlightDoneReportApp';
import FlightDonesReport from './flightDone/FlightDoneReport';

/**
 * The E-Commerce app configuration.
 */
const FlightDoneReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightDoneReport',
      element: <FlightDoneReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightDoneReports' />,
        },

        {
          path: 'flightDoneReports/:flightDoneReportId?/*',
          element: <FlightDonesReport />,
        },
      ],
    },
  ],
};
export default FlightDoneReportAppConfig;
