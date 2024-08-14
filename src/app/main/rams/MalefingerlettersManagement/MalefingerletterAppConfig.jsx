import { Navigate } from 'react-router-dom';
import MalefingerletterApp from './MalefingerletterApp';
import Malefingerletter from './malefingerletter/Malefingerletter';

/**
 * The E-Commerce app configuration.
 */
const MalefingerletterAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/malefingerletter',
			element: <MalefingerletterApp />,
			children: [
				{
					path: '',
					element: <Navigate to="malefingerletters" />
				},

				{
					path: 'malefingerletters/:malefingerletterId?/*',
					element: <Malefingerletter />
				}
			]
		}
	]
};
export default MalefingerletterAppConfig;
