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
			path: 'apps/Mofa',
			element: <MofaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="Mofas" />
				},

				{
					path: 'Mofas/:MofaId/:fromSearch?',
					element: <Mofa />
				}
			]
		}
	]
};
export default MofaAppConfig;
