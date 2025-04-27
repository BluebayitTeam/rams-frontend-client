import { Navigate } from 'react-router-dom';
import AttendanceReportsReportApp from './BbitEmployeeAttendanceReportsReportApp';
import AttendanceReportsReport from './bbitEmployeeAttendanceReport/BbitEmployeeAttendanceReport';

/**
 * The E-Commerce app configuration.
 */

// apps/bbitAttendanceReports/bbitAttendanceReport

const BbitEmployeeAttendanceReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/bbitAttendanceReports',
      element: <AttendanceReportsReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='bbitAttendanceReport' />,
        },

        {
          path: 'bbitAttendanceReport/:attendanceReportId?/*',
          element: <AttendanceReportsReport />,
        },
      ],
    },
  ],
};
export default BbitEmployeeAttendanceReportAppConfig;
