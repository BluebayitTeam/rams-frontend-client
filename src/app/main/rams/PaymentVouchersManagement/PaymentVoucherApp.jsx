import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PaymentVoucherApp() {
	return <Outlet />;
}

export default withReducer('paymentVoucherApp', reducer)(PaymentVoucherApp);
