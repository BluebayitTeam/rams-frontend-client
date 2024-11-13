import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function DemandReportApp() {
  return <Outlet />;
}

export default withReducer('demandReportApp', reducer)(DemandReportApp);
