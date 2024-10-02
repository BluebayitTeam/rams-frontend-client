import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ReceiptSummaryReportApp() {
	return <Outlet />;
}

export default withReducer('receiptSummaryReportApp', reducer)(ReceiptSummaryReportApp);
