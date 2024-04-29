import { Navigate } from 'react-router-dom';
import AgentApp from './AgentApp';
import Agents from './agents/Agents';
import Agent from './agent/Agent';

/**
 * The E-Commerce app configuration.
 */
const AgentAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/agent',
			element: <AgentApp />,
			children: [
				{
					path: '',
					element: <Navigate to="agents" />
				},
				{
					path: 'agents',
					element: <Agents />
				},
				{
					path: 'agents/success',
					element: <Agents />
				},
				{
					path: 'agents/:clientId/*',
					element: <Agent />
				}
			]
		}
	]
};
export default AgentAppConfig;
