import { Navigate } from 'react-router-dom';
import PostDateChequeApp from './PostDateChequeApp';
import PostDateCheques from './postDateCheques/PostDateCheques';
import PostDateCheque from './postDateCheque/PostDateCheque';

/**
 * The E-Commerce app configuration.
 */
const PostDateChequeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/postDateCheque',
			element: <PostDateChequeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="postDateCheques" />
				},
				{
					path: 'postDateCheques',
					element: <PostDateCheques />
				},
				{
					path: 'postDateCheques/:postDateChequeId/*',
					element: <PostDateCheque />
				}
			]
		}
	]
};
export default PostDateChequeAppConfig;
