import { Navigate } from 'react-router-dom';
import ManpowerSubmissionListApp from './ManpowerSubmissionListApp';
import ManpowerSubmissionLists from './manpowerSubmissionLists/ManpowerSubmissionLists';
import ManpowerSubmissionList from './manpowerSubmissionList/ManpowerSubmissionList';

const ManpowerSubmissionListAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/manpowerSubmissionList',
			element: <ManpowerSubmissionListApp />,
			children: [
				{
					path: '',
					element: <Navigate to="manpowerSubmissionLists" />
				},
				{
					path: 'manpowerSubmissionLists',
					element: <ManpowerSubmissionLists />
				},
				{
					path: 'manpowerSubmissionLists/:manpowerSubmissionListId/*',
					element: <ManpowerSubmissionList />
				}
			]
		}
	]
};
export default ManpowerSubmissionListAppConfig;
