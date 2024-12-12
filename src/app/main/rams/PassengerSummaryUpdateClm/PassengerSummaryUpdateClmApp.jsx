import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ReportClmApp() {
  return <Outlet />;
}

export default withReducer('reportClmApp', reducer)(ReportClmApp);
