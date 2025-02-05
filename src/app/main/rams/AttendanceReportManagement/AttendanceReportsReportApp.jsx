import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function AttendanceReportsReportApp() {
  return <Outlet />;
}

export default withReducer(
  'attendancereportsReportApp',
  reducer
)(AttendanceReportsReportApp);
