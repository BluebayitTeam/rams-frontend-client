import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function FlightFlightDoneReportApp() {
  return <Outlet />;
}

export default withReducer(
  'flightFlightDoneReportApp',
  reducer
)(FlightFlightDoneReportApp);
