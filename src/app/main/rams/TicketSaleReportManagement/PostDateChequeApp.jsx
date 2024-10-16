import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PostDateChequeReportApp() {
	return <Outlet />;
}

export default withReducer('postDateChequeReportApp', reducer)(PostDateChequeReportApp);
