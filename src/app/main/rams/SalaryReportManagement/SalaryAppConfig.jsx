import { Navigate } from 'react-router-dom';
import SalaryReportApp from './SalaryReportApp';
import SalaryReport from './salaryReport/SalaryReport';

/**
 * The E-Commerce app configuration.
 */
const SalaryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/salaryReport',
      element: <SalaryReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='salaryReports' />,
        },

        {
          path: 'salaryReports/:salaryReportId?/*',
          element: <SalaryReport />,
        },
      ],
    },
  ],
};
export default SalaryReportAppConfig;
