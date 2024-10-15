import { Navigate } from 'react-router-dom';
import PostDateChequeReportApp from './PostDateChequeApp';
import PostDateChequeReport from './postDateChequeReport/PostDateChequeReport';

/**
 * The E-Commerce app configuration.
 */
const PostDateChequeReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/postDateChequeReport',
			element: <PostDateChequeReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="postDateChequeReports" />
				},

				{
					path: 'postDateChequeReports/:postDateChequeReportId?/*',
					element: <PostDateChequeReport />
				}
			]
		}
	]
};
export default PostDateChequeReportAppConfig;
