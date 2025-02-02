import { Navigate } from 'react-router-dom';
import SalaryLedgerReportApp from './SalaryLedgerReportApp';
import SalaryLedgerReport from './salaryLedgerReport/SalaryLedgerReport';

/**
 * The E-Commerce app configuration.
 */
const SalaryLedgerReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/salaryledgerReport',
      element: <SalaryLedgerReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='salaryledgerReports' />,
        },

        {
          path: 'salaryledgerReports/:salaryledgerReportId?/*',
          element: <SalaryLedgerReport />,
        },
      ],
    },
  ],
};
export default SalaryLedgerReportAppConfig;
