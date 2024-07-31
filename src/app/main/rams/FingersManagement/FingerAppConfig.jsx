import { Navigate } from 'react-router-dom';
import FingerApp from './FingerApp';
import Finger from './finger/Finger';

/**
 * The E-Commerce app configuration.
 */
const FingerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/finger',
			element: <FingerApp />,
			children: [
				{
					path: '',
					element: <Navigate to="fingers" />
				},

				{
					path: 'fingers/:fingerId?/*',
					element: <Finger />
				}
			]
		}
	]
};
export default FingerAppConfig;
