import { Navigate } from 'react-router-dom';
import ComplainApp from './ComplainApp';
import Complains from './complains/Complains';
import Complain from './complain/Complain';

/**
 * The E-Commerce app configuration.
 */
const ComplainAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/complain',
			element: <ComplainApp />,
			children: [
				{
					path: '',
					element: <Navigate to="complains" />
				},
				{
					path: 'complains',
					element: <Complains />
				},

				{
					path: 'complains/:complainId/*',
					element: <Complain />
				}
			]
		}
	]
};
export default ComplainAppConfig;
