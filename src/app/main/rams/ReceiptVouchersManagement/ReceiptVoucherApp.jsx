import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ReceiptVoucherApp() {
	return <Outlet />;
}

export default withReducer('receiptVoucherApp', reducer)(ReceiptVoucherApp);
