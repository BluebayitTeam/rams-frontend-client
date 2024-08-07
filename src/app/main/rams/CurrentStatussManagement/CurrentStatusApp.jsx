import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CurrentStatusApp() {
	return <Outlet />;
}

export default withReducer('currentStatusApp', reducer)(CurrentStatusApp);
