import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TicketPostingApp() {
	return <Outlet />;
}

export default withReducer('ticketPostingApp', reducer)(TicketPostingApp);
