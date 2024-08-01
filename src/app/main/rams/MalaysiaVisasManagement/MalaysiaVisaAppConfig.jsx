import { Navigate } from 'react-router-dom';
import MalaysiaVisaApp from './MalaysiaVisaApp';
import MalaysiaVisa from './malaysiaVisa/MalaysiaVisa';

/**
 * The E-Commerce app configuration.
 */
const MalaysiaVisaAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/malaysiaVisa',
			element: <MalaysiaVisaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="malaysiaVisas" />
				},

				{
					path: 'malaysiaVisas/:malaysiaVisaId?/*',
					element: <MalaysiaVisa />
				}
			]
		}
	]
};
export default MalaysiaVisaAppConfig;
