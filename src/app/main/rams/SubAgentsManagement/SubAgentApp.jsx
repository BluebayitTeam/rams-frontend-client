import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function SubAgentApp() {
  return <Outlet />;
}

export default withReducer('subAgentApp', reducer)(SubAgentApp);
