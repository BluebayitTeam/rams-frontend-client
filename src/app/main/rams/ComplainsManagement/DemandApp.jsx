import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DemandApp() {
  return <Outlet />;
}

export default withReducer('demandApp', reducer)(DemandApp);
