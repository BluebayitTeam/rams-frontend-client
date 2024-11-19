import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerSearchApp() {
  return <Outlet />;
}

export default withReducer('passengerSearchApp', reducer)(PassengerSearchApp);
