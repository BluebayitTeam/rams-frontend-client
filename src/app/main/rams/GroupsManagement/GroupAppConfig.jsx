import { Navigate } from 'react-router-dom';
import GroupApp from './GroupApp';
import Groups from './groups/Groups';
import Group from './group/Group';

/**
 * The E-Commerce app configuration.
 */
const GroupAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/group',
			element: <GroupApp />,
			children: [
				{
					path: '',
					element: <Navigate to="groups" />
				},
				{
					path: 'groups',
					element: <Groups />
				},
				{
					path: 'groups/:groupId/*',
					element: <Group />
				}
			]
		}
	]
};
export default GroupAppConfig;
