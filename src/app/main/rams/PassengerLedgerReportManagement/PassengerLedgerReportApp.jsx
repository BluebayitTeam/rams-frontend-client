import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PassengerLedgerReportApp() {
	return <Outlet />;
}

export default withReducer('passengerLedgerReportApp', reducer)(PassengerLedgerReportApp);
