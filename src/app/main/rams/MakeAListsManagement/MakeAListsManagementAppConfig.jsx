import { Navigate } from 'react-router-dom';
import MakeAListsManagementApp from './MakeAListsManagementApp';
import MakeAListsManagements from './makeAListsManagements/MakeAListsManagements';
import MakeAListsManagement from './makeAListsManagement/MakeAListsManagement';

/**
 * The E-Commerce app configuration.
 */
const MakeAListsManagementAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/makeAListsManagement',
			element: <MakeAListsManagementApp />,
			children: [
				{
					path: '',
					element: <Navigate to="makeAListsManagements" />
				},
				{
					path: 'makeAListsManagements',
					element: <MakeAListsManagements />
				},
				{
					path: 'makeAListsManagements/:makeAListsManagementId/*',
					element: <MakeAListsManagement />
				}
			]
		}
	]
};
export default MakeAListsManagementAppConfig;
