import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function UnitApp() {
  return <Outlet />;
}

export default withReducer('unitApp', reducer)(UnitApp);
