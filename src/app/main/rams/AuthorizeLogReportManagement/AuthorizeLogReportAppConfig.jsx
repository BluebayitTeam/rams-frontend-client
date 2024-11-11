import { Navigate } from 'react-router-dom';
import AuthorizeLogReportApp from './AuthorizeLogReportApp';
import AuthorizeLogReport from './authorizeLogReport/AuthorizeLogReport';

/**
 * The E-Commerce app configuration.
 */
const AuthorizeLogReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/authorizeLogReport',
      element: <AuthorizeLogReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='authorizeLogReports' />,
        },

        {
          path: 'authorizeLogReports/:authorizeLogReportId?/*',
          element: <AuthorizeLogReport />,
        },
      ],
    },
  ],
};
export default AuthorizeLogReportAppConfig;
