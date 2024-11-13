import { Navigate } from 'react-router-dom';
import DemandReportApp from './DemandReportApp';
import DemandReport from './demandReport/Demand';

/**
 * The E-Commerce app configuration.
 */
const DemandReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/demandReport',
      element: <DemandReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='demandReports' />,
        },

        {
          path: 'demandReports/:demandReportId?/*',
          element: <DemandReport />,
        },
      ],
    },
  ],
};
export default DemandReportAppConfig;
