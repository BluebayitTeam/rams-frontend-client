import { Navigate } from 'react-router-dom';
import MusanedOkalaApp from './VisaCancelListApp';
import MusanedOkala from './visaCancelList/MusanedOkala';

/**
 * The E-Commerce app configuration.
 */
const MusanedOkalaAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/musanedOkala-management',
			element: <MusanedOkalaApp />,
			children: [
				{
					path: '',
					element: <Navigate to="musanedOkalas" />
				},

				{
					path: 'musanedOkalas/:musanedOkalaId/:fromSearch?',
					element: <MusanedOkala />
				}
			]
		}
	]
};
export default MusanedOkalaAppConfig;
