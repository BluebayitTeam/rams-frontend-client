import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerApp() {
	return <Outlet />;
}

export default withReducer('passengerApp', reducer)(PassengerApp);
