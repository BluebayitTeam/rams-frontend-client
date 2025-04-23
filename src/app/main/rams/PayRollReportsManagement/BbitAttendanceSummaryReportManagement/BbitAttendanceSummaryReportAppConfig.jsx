import { Navigate } from 'react-router-dom';
import AttendanceSumarysReportApp from './AttendanceSumarysReportApp';
import AttendanceSumarysReport from './attendanceSumaryReport/AttendanceSumarysReport';

/**
 * The E-Commerce app configuration.
 */

// /apps/bbitAttendanceSummaryReports/bbitAttendanceSummaryReport

const BbitAttendanceSummaryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/bbitAttendanceSummaryReports',
      element: <AttendanceSumarysReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='bbitAttendanceSummaryReport' />,
        },

        {
          path: 'bbitAttendanceSummaryReport/:attendanceSummaryReportId?/*',
          element: <AttendanceSumarysReport />,
        },
      ],
    },
  ],
};
export default BbitAttendanceSummaryReportAppConfig;
