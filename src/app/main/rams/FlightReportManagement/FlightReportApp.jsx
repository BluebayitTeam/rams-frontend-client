import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function FlightReportApp() {
  return <Outlet />;
}

export default withReducer('flightReportApp', reducer)(FlightReportApp);
