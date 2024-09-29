import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TicketPurchaseApp() {
	return <Outlet />;
}

export default withReducer('ticketPurchaseApp', reducer)(TicketPurchaseApp);
