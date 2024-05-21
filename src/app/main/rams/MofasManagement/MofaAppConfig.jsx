import { Navigate } from 'react-router-dom';
import MofaApp from './MofaApp';
import Mofa from './Mofa/Mofa';

/**
 * The E-Commerce app configuration.
 */
const MofaAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/mofa',
			element: <MofaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="mofas" />
				},

				{
					path: 'mofas/:mofaId/:fromSearch?',
					element: <Mofa />
				}
			]
		}
	]
};
export default MofaAppConfig;
