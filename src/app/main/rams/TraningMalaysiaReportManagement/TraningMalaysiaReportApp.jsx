import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TraningMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'traningMalaysiaReportApp',
  reducer
)(TraningMalaysiaReportApp);
