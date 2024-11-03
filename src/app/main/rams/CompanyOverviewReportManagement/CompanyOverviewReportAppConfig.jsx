import { Navigate } from 'react-router-dom';
import CompanyOverviewReportApp from './CompanyOverviewReportApp';
import CompanyOverviewReport from './companyOverviewReport/CompanyOverview';

/**
 * The E-Commerce app configuration.
 */
const CompanyOverviewReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/companyOverviewReport',
      element: <CompanyOverviewReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='companyOverviewReports' />,
        },

        {
          path: 'companyOverviewReports/:companyOverviewReportId?/*',
          element: <CompanyOverviewReport />,
        },
      ],
    },
  ],
};
export default CompanyOverviewReportAppConfig;
