import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PaymentReportApp() {
	return <Outlet />;
}

export default withReducer('paymentReportApp', reducer)(PaymentReportApp);
