import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function GroupApp() {
	return <Outlet />;
}

export default withReducer('groupApp', reducer)(GroupApp);
