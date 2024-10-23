import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ActivityLogReportApp() {
  return <Outlet />;
}

export default withReducer(
  'activityLogReportApp',
  reducer
)(ActivityLogReportApp);
