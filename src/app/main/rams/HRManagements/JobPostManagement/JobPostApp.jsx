import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function JobPostApp() {
  return <Outlet />;
}

export default withReducer('JobPostApp', reducer)(JobPostApp);
