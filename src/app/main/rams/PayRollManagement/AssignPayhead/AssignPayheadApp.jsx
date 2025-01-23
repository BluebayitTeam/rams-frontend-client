import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function AssignPayheadApp() {
  return <Outlet />;
}

export default withReducer('assignPayheadApp', reducer)(AssignPayheadApp);
