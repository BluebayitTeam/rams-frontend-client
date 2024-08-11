import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function AgentReportApp() {
	return <Outlet />;
}

export default withReducer('agentReportApp', reducer)(AgentReportApp);
