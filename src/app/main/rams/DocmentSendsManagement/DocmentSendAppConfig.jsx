import { Navigate } from 'react-router-dom';
import DocmentSendApp from './DocmentSendApp';
import DocmentSend from './docmentSend/DocmentSend';

/**
 * The E-Commerce app configuration.
 */
const DocmentSendAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/docmentSend-management',
			element: <DocmentSendApp />,
			children: [
				{
					path: '',
					element: <Navigate to="docmentSends" />
				},

				{
					path: 'docmentSends/:docmentSendId/:fromSearch?',
					element: <DocmentSend />
				}
			]
		}
	]
};
export default DocmentSendAppConfig;
