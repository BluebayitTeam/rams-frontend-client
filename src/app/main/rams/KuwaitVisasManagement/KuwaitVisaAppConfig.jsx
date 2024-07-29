import { Navigate } from 'react-router-dom';
import KuwaitVisaApp from './KuwaitVisaApp';
import KuwaitVisa from './kuwaitVisa/KuwaitVisa';

/**
 * The E-Commerce app configuration.
 */
const KuwaitVisaAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/kuwaitVisa',
			element: <KuwaitVisaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="kuwaitVisas" />
				},

				{
					path: 'kuwaitVisas/:kuwaitVisaId?/*',
					element: <KuwaitVisa />
				}
			]
		}
	]
};
export default KuwaitVisaAppConfig;
