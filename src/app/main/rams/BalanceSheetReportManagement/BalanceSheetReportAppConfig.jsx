import { Navigate } from 'react-router-dom';
import BalanceSheetReportApp from './BalanceSheetApp';
import BalanceSheetReport from './balanceSheetReport/BalanceSheetReport';

/**
 * The E-Commerce app configuration.
 */
const BalanceSheetReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/balanceSheetReport',
      element: <BalanceSheetReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='balanceSheetReports' />,
        },

        {
          path: 'balanceSheetReports/:balanceSheetReportId?/*',
          element: <BalanceSheetReport />,
        },
      ],
    },
  ],
};
export default BalanceSheetReportAppConfig;
