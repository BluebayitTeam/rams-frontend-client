import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ReceivableBillApp() {
	return <Outlet />;
}

export default withReducer('receivableBillApp', reducer)(ReceivableBillApp);
