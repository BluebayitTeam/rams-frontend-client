import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerTypeApp() {
	return <Outlet />;
}

export default withReducer('passengerTypeApp', reducer)(PassengerTypeApp);
