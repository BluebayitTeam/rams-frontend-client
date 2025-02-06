import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function LeaveApplicationApp() {
  return <Outlet />;
}

export default withReducer('LeaveApplicationApp', reducer)(LeaveApplicationApp);
