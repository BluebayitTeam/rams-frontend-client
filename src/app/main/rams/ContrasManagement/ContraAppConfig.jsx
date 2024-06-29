import { Navigate } from 'react-router-dom';
import ContraApp from './ContraApp';
import Contras from './contras/Contras';
import Contra from './contra/Contra';

/**
 * The E-Commerce app configuration.
 */
const ContraAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/contra',
			element: <ContraApp />,
			children: [
				{
					path: '',
					element: <Navigate to="contras" />
				},
				{
					path: 'contras',
					element: <Contras />
				},
				{
					path: 'contras/:contraId/:invoice_no?',
					element: <Contra />
				}
			]
		}
	]
};
export default ContraAppConfig;
