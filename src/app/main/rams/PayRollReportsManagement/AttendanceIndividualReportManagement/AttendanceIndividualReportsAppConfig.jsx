import { Navigate } from 'react-router-dom';
import AttendanceReportsReportApp from './AttendanceReportsReportApp';
import AttendanceReportsReport from './attendanceReport/AttendanceReportsReport';

/**
 * The E-Commerce app configuration.
 */
const AttendanceIndividualReportsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/attendancereportsReport',
      element: <AttendanceReportsReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='attendancereportsReports' />,
        },

        {
          path: 'attendancereportsReports/:attendancereportsReportId?/*',
          element: <AttendanceReportsReport />,
        },
      ],
    },
  ],
};
export default AttendanceIndividualReportsAppConfig;
