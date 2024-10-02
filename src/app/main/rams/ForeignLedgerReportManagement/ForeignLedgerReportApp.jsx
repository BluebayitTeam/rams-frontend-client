import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ForeignLedgerReportApp() {
	return <Outlet />;
}

export default withReducer('foreignLedgerReportApp', reducer)(ForeignLedgerReportApp);
