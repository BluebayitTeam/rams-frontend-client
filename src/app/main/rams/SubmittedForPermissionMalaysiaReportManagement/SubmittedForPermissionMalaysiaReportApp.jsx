import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SubmittedForPermissionMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'submittedforpermissionMalaysiaReportApp',
  reducer
)(SubmittedForPermissionMalaysiaReportApp);
