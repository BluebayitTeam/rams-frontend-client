import { Navigate } from 'react-router-dom';
import AccountsClearedMalaysiaReportApp from './AccountsClearedMalaysiaReportApp';
import AccountsClearedMalaysiasReport from './accountsCleared/AccountsClearedMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const AccountsClearedMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/accountsclearedMalaysiaReport',
      element: <AccountsClearedMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='accountsclearedMalaysiaReports' />,
        },

        {
          path: 'accountsclearedMalaysiaReports/:accountsclearedMalaysiaReportId?/*',
          element: <AccountsClearedMalaysiasReport />,
        },
      ],
    },
  ],
};
export default AccountsClearedMalaysiaReportAppConfig;
