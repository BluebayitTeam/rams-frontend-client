import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PassportExpireReportApp() {
  return <Outlet />;
}

export default withReducer(
  'passportExpireReportApp',
  reducer
)(PassportExpireReportApp);
