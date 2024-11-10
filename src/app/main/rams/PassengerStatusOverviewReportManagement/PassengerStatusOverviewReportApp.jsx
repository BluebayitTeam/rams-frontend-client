import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PassengerStatusOverviewReportApp() {
  return <Outlet />;
}

export default withReducer(
  'passengerStatusOverviewReportApp',
  reducer
)(PassengerStatusOverviewReportApp);
