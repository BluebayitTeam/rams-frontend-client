import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function CallingEntryReportApp() {
  return <Outlet />;
}

export default withReducer(
  'callingEntryReportApp',
  reducer
)(CallingEntryReportApp);
