import { Navigate } from 'react-router-dom';
import ThailandVisaApp from './ThailandVisaApp';
import ThailandVisa from './thailandVisa/ThailandVisa';

/**
 * The E-Commerce app configuration.
 */
const ThailandVisaAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/thailandVisa',
			element: <ThailandVisaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="thailandVisas" />
				},

				{
					path: 'thailandVisas/:thailandVisaId?/*',
					element: <ThailandVisa />
				}
			]
		}
	]
};
export default ThailandVisaAppConfig;
