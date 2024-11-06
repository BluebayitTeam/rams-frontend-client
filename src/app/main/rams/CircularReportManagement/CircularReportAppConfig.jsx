import { Navigate } from 'react-router-dom';
import CircularReportApp from './CircularReportApp';
import CircularReport from './circularReport/CircularReport';

/**
 * The E-Commerce app configuration.
 */
const CircularReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/circularReport',
      element: <CircularReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='circularReports' />,
        },

        {
          path: 'circularReports/:circularReportId?/*',
          element: <CircularReport />,
        },
      ],
    },
  ],
};
export default CircularReportAppConfig;
