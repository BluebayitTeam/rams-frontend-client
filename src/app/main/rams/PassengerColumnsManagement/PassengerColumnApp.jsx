import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerColumnApp() {
	return <Outlet />;
}

export default withReducer('columnApp', reducer)(PassengerColumnApp);
