import { Navigate } from 'react-router-dom';
import DispatchedMalaysiaReportApp from './DispatchedMalaysiaReportApp';
import DispatchedMalaysiasReport from './dispatched/DispatchedMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const DispatchedMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/dispatchedMalaysiaReport',
      element: <DispatchedMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='dispatchedMalaysiaReports' />,
        },

        {
          path: 'dispatchedMalaysiaReports/:dispatchedMalaysiaReportId?/*',
          element: <DispatchedMalaysiasReport />,
        },
      ],
    },
  ],
};
export default DispatchedMalaysiaReportAppConfig;
