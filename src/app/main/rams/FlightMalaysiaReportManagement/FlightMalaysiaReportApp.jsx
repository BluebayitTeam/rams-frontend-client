import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function FlightMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'flightMalaysiaReportApp',
  reducer
)(FlightMalaysiaReportApp);
