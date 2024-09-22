import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TicketSaleApp() {
  return <Outlet />;
}

export default withReducer('ticketSaleApp', reducer)(TicketSaleApp);
