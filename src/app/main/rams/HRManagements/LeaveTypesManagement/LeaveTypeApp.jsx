import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function LeaveTypeApp() {
  return <Outlet />;
}

export default withReducer('LeaveTypeApp', reducer)(LeaveTypeApp);
