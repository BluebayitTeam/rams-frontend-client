import { Navigate } from 'react-router-dom';
import SalarySlipsReportApp from './SalarySlipsReportApp';
import SalarySlipsReport from './salarySlipsReport/SalarySlipsReport';

/**
 * The E-Commerce app configuration.
 */
const SalarySlipsReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/salaryslipsReport',
      element: <SalarySlipsReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='salaryslipsReports' />,
        },

        {
          path: 'salaryslipsReports/:salaryslipsReportId?/*',
          element: <SalarySlipsReport />,
        },
      ],
    },
  ],
};
export default SalarySlipsReportAppConfig;
