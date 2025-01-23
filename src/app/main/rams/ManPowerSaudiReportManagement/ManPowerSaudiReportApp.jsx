import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ManPowerSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'manPowerSaudiReportApp',
  reducer
)(ManPowerSaudiReportApp);
