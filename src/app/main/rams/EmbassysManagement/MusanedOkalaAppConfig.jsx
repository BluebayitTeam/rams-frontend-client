import { Navigate } from 'react-router-dom';
import MusanedOkalaApp from './MusanedOkalaApp';
import MusanedOkala from './embassy/MusanedOkala';

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
