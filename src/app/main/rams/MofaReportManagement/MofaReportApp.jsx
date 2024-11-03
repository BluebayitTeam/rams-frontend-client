import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MofaReportApp() {
  return <Outlet />;
}

export default withReducer('mofaReportApp', reducer)(MofaReportApp);
