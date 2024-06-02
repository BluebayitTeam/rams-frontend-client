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
			path: 'apps/docmentSend',
			element: <DocmentSendApp />,
			children: [
				{
					path: '',
					element: <Navigate to="docmentSends" />
				},

				{
					path: 'docmentSends/:docmentSendId?',
					element: <DocmentSend />
				}
			]
		}
	]
};
export default DocmentSendAppConfig;
