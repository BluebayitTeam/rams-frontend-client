import { Navigate } from 'react-router-dom';
import VisaStampOkReportApp from './VisaStampOkApp';
import VisaStampOksReport from './visaStampOk/VisaStampOkReport';

/**
 * The E-Commerce app configuration.
 */
const VisaStampOkReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaStampOkReport',
      element: <VisaStampOkReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaStampOkReports' />,
        },

        {
          path: 'visaStampOkReports/:visaStampOkReportId?/*',
          element: <VisaStampOksReport />,
        },
      ],
    },
  ],
};
export default VisaStampOkReportAppConfig;
