import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TotalTicketReportApp() {
  return <Outlet />;
}

export default withReducer(
  'totalTicketReportApp',
  reducer
)(TotalTicketReportApp);
