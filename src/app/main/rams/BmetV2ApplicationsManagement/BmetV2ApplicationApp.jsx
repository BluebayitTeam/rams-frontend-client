import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function BmetV2ApplicationApp() {
	return <Outlet />;
}

export default withReducer('bmetV2ApplicationApp', reducer)(BmetV2ApplicationApp);
