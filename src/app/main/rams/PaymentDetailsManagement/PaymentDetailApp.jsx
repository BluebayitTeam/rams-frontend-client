import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PaymentDetailApp() {
	return <Outlet />;
}

export default withReducer('paymentDetailApp', reducer)(PaymentDetailApp);
