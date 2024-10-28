import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketsalessummaryReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketsalessummaryReportApp',
  reducer
)(TicketsalessummaryReportApp);
