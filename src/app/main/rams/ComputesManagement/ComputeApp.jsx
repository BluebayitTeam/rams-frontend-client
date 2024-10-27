import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ComputeApp() {
  return <Outlet />;
}

export default withReducer('computeApp', reducer)(ComputeApp);
