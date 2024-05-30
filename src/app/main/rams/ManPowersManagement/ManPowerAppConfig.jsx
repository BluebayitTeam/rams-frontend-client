import { Navigate } from 'react-router-dom';
import ManPowerApp from './ManPowerApp';
import ManPower from './manPower/ManPower';

/**
 * The E-Commerce app configuration.
 */
const ManPowerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/manPower-management',
			element: <ManPowerApp />,
			children: [
				{
					path: '',
					element: <Navigate to="manPowers" />
				},

				{
					path: 'manPowers/:manPowerId/:fromSearch?',

					element: <ManPower />
				}
			]
		}
	]
};
export default ManPowerAppConfig;
