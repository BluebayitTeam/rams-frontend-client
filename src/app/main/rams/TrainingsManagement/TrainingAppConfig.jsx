import { Navigate } from 'react-router-dom';
import TrainingApp from './TrainingApp';
import Training from './training/Training';

/**
 * The E-Commerce app configuration.
 */
const TrainingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/training',
			element: <TrainingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="trainings" />
				},

				{
					path: 'trainings/:trainingId/:fromSearch?',
					element: <Training />
				}
			]
		}
	]
};
export default TrainingAppConfig;
