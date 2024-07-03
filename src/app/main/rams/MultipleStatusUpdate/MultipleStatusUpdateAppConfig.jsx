import { Navigate } from 'react-router-dom';
import MultipleStatusUpdateApp from './MultipleStatusUpdateApp';
import MultipleStatusUpdate from './multipleStatusUpdate/MultipleStatusUpdate';

/**
 * The E-Commerce app configuration.
 */
const MultipleStatusUpdateAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/multipleStatusUpdate',
			element: <MultipleStatusUpdateApp />,
			children: [
				{
					path: '',
					element: <Navigate to="multipleStatusUpdates" />
				},

				{
					path: 'multipleStatusUpdates/:multipleStatusUpdateId?',
					element: <MultipleStatusUpdate />
				}
			]
		}
	]
};
export default MultipleStatusUpdateAppConfig;
