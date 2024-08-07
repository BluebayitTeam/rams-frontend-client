import { Navigate } from 'react-router-dom';
import CurrentStatusApp from './CurrentStatusApp';
import CurrentStatuss from './currentStatuss/CurrentStatuss';
import CurrentStatus from './currentStatus/CurrentStatus';

/**
 * The E-Commerce app configuration.
 */
const CurrentStatusAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/currentStatus',
			element: <CurrentStatusApp />,
			children: [
				{
					path: '',
					element: <Navigate to="currentStatuss" />
				},
				{
					path: 'currentStatuss',
					element: <CurrentStatuss />
				},
				{
					path: 'currentStatuss/:currentStatusId/*',
					element: <CurrentStatus />
				}
			]
		}
	]
};
export default CurrentStatusAppConfig;
