import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function FlightApp() {
	return <Outlet />;
}

export default withReducer('flightApp', reducer)(FlightApp);
