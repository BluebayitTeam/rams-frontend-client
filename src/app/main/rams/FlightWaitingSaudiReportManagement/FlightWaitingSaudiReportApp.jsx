import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function FlightWaitingSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'flightWaitingSaudiReportApp',
  reducer
)(FlightWaitingSaudiReportApp);
