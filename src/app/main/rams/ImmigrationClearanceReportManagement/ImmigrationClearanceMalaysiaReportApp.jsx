import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ImmigrationClearanceMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'immigrationclearanceMalaysiaReportApp',
  reducer
)(ImmigrationClearanceMalaysiaReportApp);
