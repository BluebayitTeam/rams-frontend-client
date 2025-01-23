import { Navigate } from 'react-router-dom';
import VisaExpireMalaysiaReportApp from './VisaExpireMalaysiaReportApp';
import VisaExpireMalaysiasReport from './visaExpireMalaysia/VisaExpireMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const VisaExpireMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaExpireMalaysiaReport',
      element: <VisaExpireMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaExpireMalaysiaReports' />,
        },

        {
          path: 'visaExpireMalaysiaReports/:noOfDays?/:country?/*',
          element: <VisaExpireMalaysiasReport />,
        },
      ],
    },
  ],
};
export default VisaExpireMalaysiaReportAppConfig;
