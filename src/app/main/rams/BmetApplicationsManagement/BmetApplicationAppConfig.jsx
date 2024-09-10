import { Navigate } from 'react-router-dom';
import BmetApplicationApp from './BmetApplicationApp';
import BmetApplications from './bmetApplications/BmetApplications';
import BmetApplication from './bmetApplication/BmetApplication';

const BmetApplicationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/bmetApplication',
			element: <BmetApplicationApp />,
			children: [
				{
					path: '',
					element: <Navigate to="bmetApplications" />
				},
				{
					path: 'bmetApplications',
					element: <BmetApplications />
				},
				{
					path: 'bmetApplications/:bmetApplicationId/*',
					element: <BmetApplication />
				}
			]
		}
	]
};
export default BmetApplicationAppConfig;
