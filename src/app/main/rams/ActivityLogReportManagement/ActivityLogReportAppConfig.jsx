import { Navigate } from 'react-router-dom';
import ActivityLogReportApp from './ActivityLogReportApp';
import ActivityLogReport from './activityLogReport/ActivityLogReport';

/**
 * The E-Commerce app configuration.
 */
const ActivityLogReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/activityLogReport',
      element: <ActivityLogReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='activityLogReports' />,
        },

        {
          path: 'activityLogReports/:activityLogReportId?/*',
          element: <ActivityLogReport />,
        },
      ],
    },
  ],
};
export default ActivityLogReportAppConfig;
