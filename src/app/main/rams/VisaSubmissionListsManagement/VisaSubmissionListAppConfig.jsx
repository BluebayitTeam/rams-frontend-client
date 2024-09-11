import { Navigate } from 'react-router-dom';
import VisaSubmissionListApp from './VisaSubmissionListApp';
import VisaSubmissionLists from './visaSubmissionLists/VisaSubmissionLists';
import VisaSubmissionList from './visaSubmissionList/VisaSubmissionList';

const VisaSubmissionListAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/visaSubmissionList',
			element: <VisaSubmissionListApp />,
			children: [
				{
					path: '',
					element: <Navigate to="visaSubmissionLists" />
				},
				{
					path: 'visaSubmissionLists',
					element: <VisaSubmissionLists />
				},
				{
					path: 'visaSubmissionLists/:visaSubmissionListId/*',
					element: <VisaSubmissionList />
				}
			]
		}
	]
};
export default VisaSubmissionListAppConfig;
