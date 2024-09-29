import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TicketRefundApp() {
	return <Outlet />;
}

export default withReducer('ticketRefundApp', reducer)(TicketRefundApp);
