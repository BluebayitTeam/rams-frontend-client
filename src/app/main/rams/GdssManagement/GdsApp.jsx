import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function GdsApp() {
	return <Outlet />;
}

export default withReducer('gdsApp', reducer)(GdsApp);
