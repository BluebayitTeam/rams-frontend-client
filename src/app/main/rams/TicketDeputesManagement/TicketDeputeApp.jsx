import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TicketDeputeApp() {
	return <Outlet />;
}

export default withReducer('ticketDeputeApp', reducer)(TicketDeputeApp);
