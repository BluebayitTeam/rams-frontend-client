import { Navigate } from 'react-router-dom';
import MakeAListsManagementColumnApp from './MakeAListsManagementColumnApp';
import MakeAListsManagementColumn from './makeAListsManagementColumn/MakeAListsManagementColumn';

/**
 * The E-Commerce app configuration.
 */
const MakeAListsManagementColumnAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/makeAListsManagementColumn',
			element: <MakeAListsManagementColumnApp />,
			children: [
				{
					path: '',
					element: <Navigate to="makeAListsManagementColumns" />
				},

				{
					path: 'makeAListsManagementColumns/:makeAListsManagementColumnId/*',
					element: <MakeAListsManagementColumn />
				}
			]
		}
	]
};
export default MakeAListsManagementColumnAppConfig;
