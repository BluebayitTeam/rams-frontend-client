import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function FlightWaitingReportApp() {
  return <Outlet />;
}

export default withReducer(
  'flightWaitingReportApp',
  reducer
)(FlightWaitingReportApp);
