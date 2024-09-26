import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ReceiptReportApp() {
	return <Outlet />;
}

export default withReducer('receiptReportApp', reducer)(ReceiptReportApp);
