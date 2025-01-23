import { Navigate } from 'react-router-dom';
import VisaStatusReport from './visaStatusReport/VisaStatusReport';
import VisaStatusReportApp from './visaStatusReportApp';

/**
 * The E-Commerce app configuration.
 */
const VisaStatusReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaStatusReport',
      element: <VisaStatusReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaStatusReports' />,
        },

        {
          path: 'visaStatusReports/:visaStatusReportId?/*',
          element: <VisaStatusReport />,
        },
      ],
    },
  ],
};
export default VisaStatusReportAppConfig;
