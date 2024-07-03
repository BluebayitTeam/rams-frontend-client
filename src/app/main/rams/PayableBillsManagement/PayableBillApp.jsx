import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PayableBillApp() {
	return <Outlet />;
}

export default withReducer('payableBillApp', reducer)(PayableBillApp);
