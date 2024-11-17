import { Navigate } from 'react-router-dom';
import ProfitLossReportApp from './ProfitLossApp';
import ProfitLossReport from './profitLossReport/ProfitLossReport';

/**
 * The E-Commerce app configuration.
 */
const ProfitLossReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/profitLossReport',
      element: <ProfitLossReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='profitLossReports' />,
        },

        {
          path: 'profitLossReports/:profitLossReportId?/*',
          element: <ProfitLossReport />,
        },
      ],
    },
  ],
};
export default ProfitLossReportAppConfig;
