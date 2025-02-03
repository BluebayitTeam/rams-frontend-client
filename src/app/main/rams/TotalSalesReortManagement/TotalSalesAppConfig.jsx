import { Navigate } from 'react-router-dom';
import TotalSalesReportApp from './TotalSalesReportApp';
import TotalSalessReport from './totalSales/TotalSalesReport';

/**
 * The E-Commerce app configuration.
 */
const TotalSalesReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/TotalSalesReport',
      element: <TotalSalesReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='TotalSalesReports' />,
        },

        {
          path: 'TotalSalesReports/:TotalSalesReportId?/*',
          element: <TotalSalessReport />,
        },
      ],
    },
  ],
};
export default TotalSalesReportAppConfig;
