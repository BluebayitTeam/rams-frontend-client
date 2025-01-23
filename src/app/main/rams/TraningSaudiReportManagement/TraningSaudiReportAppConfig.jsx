import { Navigate } from 'react-router-dom';
import TraningSaudiReportApp from './TraningSaudiReportApp';
import TraningSaudiReport from './traningSaudiReport/TraningSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const TraningSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/traningSaudiReport',
      element: <TraningSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='traningSaudiReports' />,
        },

        {
          path: 'traningSaudiReports/:traningSaudiReportId?/*',
          element: <TraningSaudiReport />,
        },
      ],
    },
  ],
};
export default TraningSaudiReportAppConfig;
