import { Navigate } from 'react-router-dom';
import VisaExpairsReportApp from './VisaExpairsReportApp';
import VisaExpairssReport from './visaExpairs/VisaExpairsReport';

/**
 * The E-Commerce app configuration.
 */
const VisaExpairsReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/visaExpairsReport',
      element: <VisaExpairsReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='visaExpairsReports' />,
        },

        {
          path: 'visaExpairsReports/:noOfDays?/*',
          element: <VisaExpairssReport />,
        },
      ],
    },
  ],
};
export default VisaExpairsReportAppConfig;
