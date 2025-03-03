import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function AutoStatusUpdateApp() {
  return <Outlet />;
}

export default withReducer('autoStatusUpdateApp', reducer)(AutoStatusUpdateApp);
