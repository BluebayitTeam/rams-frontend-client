import { Navigate } from 'react-router-dom';
import VisaAdviseMalaysiaReportApp from './VisaAdviseMalaysiaReportApp';
import VisaAdviseMalaysiasReport from './visaAdvise/VisaAdviseMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const VisaAdviseMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaadviseMalaysiaReport',
      element: <VisaAdviseMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaadviseMalaysiaReports' />,
        },

        {
          path: 'visaadviseMalaysiaReports/:visaadviseMalaysiaReportId?/*',
          element: <VisaAdviseMalaysiasReport />,
        },
      ],
    },
  ],
};
export default VisaAdviseMalaysiaReportAppConfig;
