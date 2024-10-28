import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TicketsalesummeryfilterdataReportApp() {
  return <Outlet />;
}

export default withReducer(
  'ticketsalesummeryfilterdataReportApp',
  reducer
)(TicketsalesummeryfilterdataReportApp);
