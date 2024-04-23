import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function RoleMenuApp() {
	return <Outlet />;
}

export default withReducer('roleMenuApp', reducer)(RoleMenuApp);
