import { Navigate } from 'react-router-dom';
import BranchApp from './BranchApp';
import Branchs from './branchs/Branchs';
import Branch from './branch/Branch';

/**
 * The E-Commerce app configuration.
 */
const BranchAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/branch',
			element: <BranchApp />,
			children: [
				{
					path: '',
					element: <Navigate to="branchs" />
				},
				{
					path: 'branchs',
					element: <Branchs />
				},
				{
					path: 'branchs/:branchId/*',
					element: <Branch />
				}
			]
		}
	]
};
export default BranchAppConfig;
