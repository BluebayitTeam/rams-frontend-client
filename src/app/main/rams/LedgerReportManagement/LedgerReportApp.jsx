import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function LedgerReportApp() {
	return <Outlet />;
}

export default withReducer('ledgerReportApp', reducer)(LedgerReportApp);
