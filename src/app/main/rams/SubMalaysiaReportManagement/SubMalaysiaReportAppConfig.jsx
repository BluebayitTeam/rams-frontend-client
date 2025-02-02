import { Navigate } from 'react-router-dom';
import SubMalaysiaReportApp from './SubMalaysiaReportApp';
import SubMalaysiasReport from './subMalaysia/SubMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const SubMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/subMalaysiaReport',
      element: <SubMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='subMalaysiaReports' />,
        },

        {
          path: 'subMalaysiaReports/:subMalaysiaReportId?/*',
          element: <SubMalaysiasReport />,
        },
      ],
    },
  ],
};
export default SubMalaysiaReportAppConfig;
