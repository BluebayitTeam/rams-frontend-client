import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function EmbassySaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'embassySaudiReportApp',
  reducer
)(EmbassySaudiReportApp);
