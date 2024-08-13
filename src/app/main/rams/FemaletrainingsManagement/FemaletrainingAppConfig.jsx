import { Navigate } from 'react-router-dom';
import FemaletrainingApp from './FemaletrainingApp';
import Femaletraining from './femaletraining/Femaletraining';

/**
 * The E-Commerce app configuration.
 */
const FemaletrainingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/femaletraining',
			element: <FemaletrainingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="femaletrainings" />
				},

				{
					path: 'femaletrainings/:femaletrainingId?/*',
					element: <Femaletraining />
				}
			]
		}
	]
};
export default FemaletrainingAppConfig;
