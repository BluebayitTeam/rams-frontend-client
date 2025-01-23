import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function FlightDoneReportApp() {
  return <Outlet />;
}

export default withReducer('flightDoneReportApp', reducer)(FlightDoneReportApp);
