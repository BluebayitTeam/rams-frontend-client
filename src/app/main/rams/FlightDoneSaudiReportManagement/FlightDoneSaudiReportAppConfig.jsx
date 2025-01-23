import { Navigate } from 'react-router-dom';
import FlightDoneSaudiReportApp from './FlightDoneSaudiReportApp';
import FlightDoneSaudiReport from './flightDoneSaudiReport/FlightDoneSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const FlightDoneSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/flightDoneSaudiReport',
      element: <FlightDoneSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='flightDoneSaudiReports' />,
        },

        {
          path: 'flightDoneSaudiReports/:flightDoneSaudiReportId?/*',
          element: <FlightDoneSaudiReport />,
        },
      ],
    },
  ],
};
export default FlightDoneSaudiReportAppConfig;
