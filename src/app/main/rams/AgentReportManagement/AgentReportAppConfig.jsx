import { Navigate } from 'react-router-dom';
import AgentReportApp from './AgentReportApp';
import AgentReport from './agentReport/AgentReport';

/**
 * The E-Commerce app configuration.
 */
const AgentReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/agentReport',
			element: <AgentReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="agentReports" />
				},

				{
					path: 'agentReports/:agentReportId?/*',
					element: <AgentReport />
				}
			]
		}
	]
};
export default AgentReportAppConfig;
