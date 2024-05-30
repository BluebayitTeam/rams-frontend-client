import { Navigate } from 'react-router-dom';
import VisaCancelListApp from './VisaCancelListApp';
import VisaCancelList from './visaCancelList/VisaCancelList';

/**
 * The E-Commerce app configuration.
 */
const VisaCancelListAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/visaCancelList-management',
			element: <VisaCancelListApp />,
			children: [
				{
					path: '',
					element: <Navigate to="visaCancelLists" />
				},

				{
					path: 'visaCancelLists/:visaCancelListId/:fromSearch?',
					element: <VisaCancelList />
				}
			]
		}
	]
};
export default VisaCancelListAppConfig;
