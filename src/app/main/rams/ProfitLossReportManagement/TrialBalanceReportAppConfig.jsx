import { Navigate } from 'react-router-dom';
import TrialBalanceReportApp from './TrialBalanceApp';
import TrialBalanceReport from './profitLossReport/TrialBalanceReport';

/**
 * The E-Commerce app configuration.
 */
const TrialBalanceReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/trialBalanceReport',
      element: <TrialBalanceReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='trialBalanceReports' />,
        },

        {
          path: 'trialBalanceReports/:trialBalanceReportId?/*',
          element: <TrialBalanceReport />,
        },
      ],
    },
  ],
};
export default TrialBalanceReportAppConfig;
