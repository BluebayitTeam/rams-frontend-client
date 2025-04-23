import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function AttendanceSumarysReportApp() {
  return <Outlet />;
}

export default withReducer(
  'bbitAttendanceSummaryReportsApp',
  reducer
)(AttendanceSumarysReportApp);
