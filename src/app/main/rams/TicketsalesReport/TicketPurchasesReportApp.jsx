import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketPurchasesReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketPurchasesReportApp',
  reducer
)(TicketPurchasesReportApp);
