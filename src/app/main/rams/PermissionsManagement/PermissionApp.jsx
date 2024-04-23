import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PermissionApp() {
	return <Outlet />;
}

export default withReducer('permissionApp', reducer)(PermissionApp);
