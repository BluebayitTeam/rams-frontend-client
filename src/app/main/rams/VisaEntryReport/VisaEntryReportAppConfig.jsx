import { Navigate } from 'react-router-dom';
import VisaEntryReportApp from './VisaEntryReportApp';
import VisaEntryReport from './visaEntryReport/VisaEntry';

/**
 * The E-Commerce app configuration.
 */
const VisaEntryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaEntryReport',
      element: <VisaEntryReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaEntryReports' />,
        },

        {
          path: 'visaEntryReports/:visaEntryReportId?/*',
          element: <VisaEntryReport />,
        },
      ],
    },
  ],
};
export default VisaEntryReportAppConfig;
