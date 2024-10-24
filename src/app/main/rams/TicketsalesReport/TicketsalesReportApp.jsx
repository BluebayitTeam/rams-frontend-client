import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketsalesReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketsalesReportApp',
  reducer
)(TicketsalesReportApp);
