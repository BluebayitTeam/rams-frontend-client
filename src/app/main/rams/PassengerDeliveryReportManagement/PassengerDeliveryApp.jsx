import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PassengerDeliveryReportApp() {
  return <Outlet />;
}

export default withReducer(
  'passengerDeliveryReportApp',
  reducer
)(PassengerDeliveryReportApp);
