import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function AuthorizeLogReportApp() {
  return <Outlet />;
}

export default withReducer(
  'authorizeLogReportApp',
  reducer
)(AuthorizeLogReportApp);
