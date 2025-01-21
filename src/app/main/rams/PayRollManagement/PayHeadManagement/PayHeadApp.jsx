import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PayHeadApp() {
	return <Outlet />;
}

export default withReducer('payHeadApp', reducer)(PayHeadApp);
