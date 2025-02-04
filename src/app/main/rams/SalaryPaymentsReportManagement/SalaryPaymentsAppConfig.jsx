import { Navigate } from 'react-router-dom';
import SalaryPaymentsReportApp from './SalaryPaymentsReportApp';
import SalaryPaymentsReport from './salarypaymentsPaymentsReport/SalaryPaymentsReport';

/**
 * The E-Commerce app configuration.
 */
const SalaryPaymentsReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/salarypaymentsReport',
      element: <SalaryPaymentsReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='salarypaymentsReports' />,
        },

        {
          path: 'salarypaymentsReports/:salarypaymentsReportId?/*',
          element: <SalaryPaymentsReport />,
        },
      ],
    },
  ],
};
export default SalaryPaymentsReportAppConfig;
