import { Navigate } from 'react-router-dom';
import ColumnApp from './ColumnApp';
import Column from './column/Column';

/**
 * The E-Commerce app configuration.
 */
const ColumnAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/column',
			element: <ColumnApp />,
			children: [
				{
					path: '',
					element: <Navigate to="columns" />
				},

				{
					path: 'columns/:columnId/*',
					element: <Column />
				}
			]
		}
	]
};
export default ColumnAppConfig;
