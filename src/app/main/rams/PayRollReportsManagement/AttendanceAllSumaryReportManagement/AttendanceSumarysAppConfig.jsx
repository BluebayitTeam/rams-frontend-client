import { Navigate } from 'react-router-dom';
import AttendanceSumarysReportApp from './AttendanceSumarysReportApp';
import AttendanceSumarysReport from './attendanceSumaryReport/AttendanceSumarysReport';

/**
 * The E-Commerce app configuration.
 */
const AttendanceAllSumarysReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/attendancesumarysReport',
      element: <AttendanceSumarysReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='attendancesumarysReports' />,
        },

        {
          path: 'attendancesumarysReports/:attendancesumarysReportId?/*',
          element: <AttendanceSumarysReport />,
        },
      ],
    },
  ],
};
export default AttendanceAllSumarysReportAppConfig;
