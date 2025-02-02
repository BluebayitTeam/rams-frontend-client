import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SubmittedSubMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'submittedsubMalaysiaReportApp',
  reducer
)(SubmittedSubMalaysiaReportApp);
