import { Navigate } from 'react-router-dom';
import BmetV2ApplicationApp from './BmetV2ApplicationApp';
import BmetV2Applications from './bmetV2Applications/BmetV2Applications';
import BmetV2Application from './bmetV2Application/BmetV2Application';

const BmetV2ApplicationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/bmetV2Application',
			element: <BmetV2ApplicationApp />,
			children: [
				{
					path: '',
					element: <Navigate to="bmetV2Applications" />
				},
				{
					path: 'bmetV2Applications',
					element: <BmetV2Applications />
				},
				{
					path: 'bmetV2Applications/:bmetV2ApplicationId/*',
					element: <BmetV2Application />
				}
			]
		}
	]
};
export default BmetV2ApplicationAppConfig;
