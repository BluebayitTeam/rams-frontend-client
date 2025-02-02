import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function DispatchedMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'dispatchedMalaysiaReportApp',
  reducer
)(DispatchedMalaysiaReportApp);
