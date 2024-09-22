import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PassengerAccountSummaryReportApp() {
	return <Outlet />;
}

export default withReducer('passengerAccountSummaryReportApp', reducer)(PassengerAccountSummaryReportApp);
