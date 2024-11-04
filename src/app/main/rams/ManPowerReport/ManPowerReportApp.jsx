import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ManPowerReportApp() {
  return <Outlet />;
}

export default withReducer('manPowerReportApp', reducer)(ManPowerReportApp);
