import { Navigate } from 'react-router-dom';
import ManpowerSubmissionV2ListApp from './ManpowerSubmissionV2ListApp';
import ManpowerSubmissionV2Lists from './manpowerSubmissionV2Lists/ManpowerSubmissionV2Lists';
import ManpowerSubmissionV2List from './manpowerSubmissionV2List/ManpowerSubmissionV2List';

/**
 * The E-Commerce app configuration.
 */
const ManpowerSubmissionV2ListAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/manpowerSubmissionV2List',
			element: <ManpowerSubmissionV2ListApp />,
			children: [
				{
					path: '',
					element: <Navigate to="manpowerSubmissionV2Lists" />
				},
				{
					path: 'manpowerSubmissionV2Lists',
					element: <ManpowerSubmissionV2Lists />
				},
				{
					path: 'manpowerSubmissionV2Lists/:manpowerSubmissionV2ListId/*',
					element: <ManpowerSubmissionV2List />
				}
			]
		}
	]
};
export default ManpowerSubmissionV2ListAppConfig;
