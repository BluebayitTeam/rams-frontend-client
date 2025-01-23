import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MofaSaudiReportApp() {
  return <Outlet />;
}

export default withReducer('mofaSaudiReportApp', reducer)(MofaSaudiReportApp);
