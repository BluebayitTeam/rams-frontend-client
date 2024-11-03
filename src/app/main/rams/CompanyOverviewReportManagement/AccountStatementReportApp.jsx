import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function AccountStatementReportApp() {
	return <Outlet />;
}

export default withReducer('accountStatementReportApp', reducer)(AccountStatementReportApp);
