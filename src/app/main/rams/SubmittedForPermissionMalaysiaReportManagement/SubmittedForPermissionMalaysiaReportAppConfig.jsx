import { Navigate } from 'react-router-dom';
import SubmittedForPermissionMalaysiaReportApp from './SubmittedForPermissionMalaysiaReportApp';
import SubmittedForPermissionMalaysiasReport from './submittedForPermission/SubmittedForPermissionMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const SubmittedForPermissionMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/submittedforpermissionMalaysiaReport',
      element: <SubmittedForPermissionMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='submittedforpermissionMalaysiaReports' />,
        },

        {
          path: 'submittedforpermissionMalaysiaReports/:submittedforpermissionMalaysiaReportId?/*',
          element: <SubmittedForPermissionMalaysiasReport />,
        },
      ],
    },
  ],
};
export default SubmittedForPermissionMalaysiaReportAppConfig;
