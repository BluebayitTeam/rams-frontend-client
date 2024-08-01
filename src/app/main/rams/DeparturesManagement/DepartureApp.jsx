import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DepartureApp() {
	return <Outlet />;
}

export default withReducer('departureApp', reducer)(DepartureApp);
