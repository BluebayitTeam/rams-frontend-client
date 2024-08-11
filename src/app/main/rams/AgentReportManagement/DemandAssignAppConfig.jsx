import { Navigate } from 'react-router-dom';
import DemandAssignApp from './DemandAssignApp';
import DemandAssign from './demandAssign/DemandAssign';

/**
 * The E-Commerce app configuration.
 */
const DemandAssignAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/demandAssign',
			element: <DemandAssignApp />,
			children: [
				{
					path: '',
					element: <Navigate to="demandAssigns" />
				},

				{
					path: 'demandAssigns/:demandAssignId?/*',
					element: <DemandAssign />
				}
			]
		}
	]
};
export default DemandAssignAppConfig;
