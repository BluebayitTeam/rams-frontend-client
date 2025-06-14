import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function AgentApp() {
	return <Outlet />;
}

export default withReducer('agentApp', reducer)(AgentApp);
