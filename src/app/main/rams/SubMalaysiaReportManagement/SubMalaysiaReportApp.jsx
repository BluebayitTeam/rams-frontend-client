import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SubMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'subMalaysiaReportApp',
  reducer
)(SubMalaysiaReportApp);
