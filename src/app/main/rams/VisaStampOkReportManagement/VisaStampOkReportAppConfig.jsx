import { Navigate } from 'react-router-dom';
import VisaStampOksReport from './visaStampOk/VisaStampOklReport';
import VisaStampOkReportApp from './VisaStampOkReportApp';

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
