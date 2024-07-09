import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MakeAListsManagementApp() {
	return <Outlet />;
}

export default withReducer('makeAListsManagementApp', reducer)(MakeAListsManagementApp);
