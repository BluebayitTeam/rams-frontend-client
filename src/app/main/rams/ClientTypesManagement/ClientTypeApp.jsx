import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ClientTypeApp() {
	return <Outlet />;
}

export default withReducer('clientTypeApp', reducer)(ClientTypeApp);
