import { Navigate } from 'react-router-dom';
import ManPowerReportApp from './ManPowerReportApp';
import ManPowerReport from './manPowerReport/ManPowerReport';

/**
 * The E-Commerce app configuration.
 */
const ManPowerReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/manPowerReport',
      element: <ManPowerReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='manPowerReports' />,
        },

        {
          path: 'manPowerReports/:manPowerReportId?/*',
          element: <ManPowerReport />,
        },
      ],
    },
  ],
};
export default ManPowerReportAppConfig;
