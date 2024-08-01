import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function FingerApp() {
	return <Outlet />;
}

export default withReducer('fingerApp', reducer)(FingerApp);
