import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function RegisteredSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'registeredSaudiReportApp',
  reducer
)(RegisteredSaudiReportApp);
