import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MenuApp() {
	return <Outlet />;
}

export default withReducer('menuApp', reducer)(MenuApp);
