import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function CreditorReportApp() {
	return <Outlet />;
}

export default withReducer('creditorReportApp', reducer)(CreditorReportApp);
