import { Navigate } from 'react-router-dom';
import VisaExpireSaudiReportApp from './VisaExpireSaudiReportApp';
import VisaExpireSaudisReport from './visaExpireSaudi/VisaExpireSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const VisaExpireSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaExpireSaudiReport',
      element: <VisaExpireSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaExpireSaudiReports' />,
        },

        {
          path: 'visaExpireSaudiReports/:noOfDays?/:country?/*',
          element: <VisaExpireSaudisReport />,
        },
      ],
    },
  ],
};
export default VisaExpireSaudiReportAppConfig;
