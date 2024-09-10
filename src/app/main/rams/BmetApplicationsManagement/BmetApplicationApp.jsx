import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function BmetApplicationApp() {
	return <Outlet />;
}

export default withReducer('bmetApplicationApp', reducer)(BmetApplicationApp);
