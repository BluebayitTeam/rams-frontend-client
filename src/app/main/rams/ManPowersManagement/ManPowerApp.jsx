import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ManPowerApp() {
	return <Outlet />;
}

export default withReducer('manPowerApp', reducer)(ManPowerApp);
