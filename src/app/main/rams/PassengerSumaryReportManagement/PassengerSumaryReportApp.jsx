import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerSumaryReportApp() {
  return <Outlet />;
}

export default withReducer(
  'passengerSumaryReportApp',
  reducer
)(PassengerSumaryReportApp);
