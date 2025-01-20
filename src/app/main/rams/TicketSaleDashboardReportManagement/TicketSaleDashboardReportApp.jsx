import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketSaleDashboardReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketSaleDashboardReportApp',
  reducer
)(TicketSaleDashboardReportApp);
