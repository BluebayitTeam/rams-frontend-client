import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerEditHistoryApp() {
  return <Outlet />;
}

export default withReducer(
  'passengerEditHistoryApp',
  reducer
)(PassengerEditHistoryApp);
