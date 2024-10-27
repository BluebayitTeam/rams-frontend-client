import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketrefundReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketrefundReportApp',
  reducer
)(TicketrefundReportApp);
