import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function RegisteredMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'registeredMalaysiaReportApp',
  reducer
)(RegisteredMalaysiaReportApp);
