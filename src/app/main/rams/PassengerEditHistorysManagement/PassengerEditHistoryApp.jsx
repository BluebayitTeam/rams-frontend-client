import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/dataSlice';

function PassengerEditHistoryApp() {
  return <Outlet />;
}

export default withReducer(
  'passengerEditHistoryApp',
  reducer
)(PassengerEditHistoryApp);
