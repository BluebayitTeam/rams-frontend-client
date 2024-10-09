import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function DrebtorReportApp() {
	return <Outlet />;
}

export default withReducer('drebtorReportApp', reducer)(DrebtorReportApp);
