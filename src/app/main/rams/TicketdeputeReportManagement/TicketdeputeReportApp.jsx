import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketdeputeReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketdeputeReportApp',
  reducer
)(TicketdeputeReportApp);
