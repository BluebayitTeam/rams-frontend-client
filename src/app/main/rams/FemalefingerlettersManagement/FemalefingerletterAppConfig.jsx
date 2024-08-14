import { Navigate } from 'react-router-dom';
import FemalefingerletterApp from './FemalefingerletterApp';
import Femalefingerletter from './femalefingerletter/Femalefingerletter';

/**
 * The E-Commerce app configuration.
 */
const FemalefingerletterAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/femalefingerletter',
			element: <FemalefingerletterApp />,
			children: [
				{
					path: '',
					element: <Navigate to="femalefingerletters" />
				},

				{
					path: 'femalefingerletters/:femalefingerletterId?/*',
					element: <Femalefingerletter />
				}
			]
		}
	]
};
export default FemalefingerletterAppConfig;
