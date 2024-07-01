import { Navigate } from 'react-router-dom';
import PostDateClearingApp from './PayorderClearingApp';
import PostDateClearings from './payorderClearings/PayorderClearings';
import PostDateClearing from './payorderClearing/PayorderClearing';

/**
 * The E-Commerce app configuration.
 */
const PostDateClearingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/payorderClearing',
			element: <PostDateClearingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="payorderClearings" />
				},
				{
					path: 'payorderClearings',
					element: <PostDateClearings />
				},
				{
					path: 'payorderClearings/:payorderClearingId/*',
					element: <PostDateClearing />
				}
			]
		}
	]
};
export default PostDateClearingAppConfig;
