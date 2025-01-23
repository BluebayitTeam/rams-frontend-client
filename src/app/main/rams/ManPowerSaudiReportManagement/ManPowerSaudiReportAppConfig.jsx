import { Navigate } from 'react-router-dom';
import ManPowerSaudiReportApp from './ManPowerSaudiReportApp';
import ManPowerSaudiReport from './manPowerSaudiReport/ManPowerSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const ManPowerSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/manPowerSaudiReport',
      element: <ManPowerSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='manPowerSaudiReports' />,
        },

        {
          path: 'manPowerSaudiReports/:manPowerSaudiReportId?/*',
          element: <ManPowerSaudiReport />,
        },
      ],
    },
  ],
};
export default ManPowerSaudiReportAppConfig;
