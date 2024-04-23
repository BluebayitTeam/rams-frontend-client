import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PackageTypeApp() {
	return <Outlet />;
}

export default withReducer('packageTypeApp', reducer)(PackageTypeApp);
