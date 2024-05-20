import { Navigate } from 'react-router-dom';
import CallingAssignApp from './CallingAssignApp';
import CallingAssign from './callingAssign/CallingAssign';

/**
 * The E-Commerce app configuration.
 */
const CallingAssignAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/callingAssign',
			element: <CallingAssignApp />,
			children: [
				{
					path: '',
					element: <Navigate to="callingAssigns" />
				},

				{
					path: 'callingAssigns/:callingAssignId?/*',
					element: <CallingAssign />
				}
			]
		}
	]
};
export default CallingAssignAppConfig;
