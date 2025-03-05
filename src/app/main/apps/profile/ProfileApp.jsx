import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ProfileApp() {
  return <Outlet />;
}

export default withReducer('profileApp', reducer)(ProfileApp);
