import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TraningSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'traningSaudiReportApp',
  reducer
)(TraningSaudiReportApp);
