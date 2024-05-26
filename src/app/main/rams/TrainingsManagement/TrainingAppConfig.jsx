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
			path: 'apps/training-management',
			element: <TrainingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="trainings" />
				},

				{
					path: 'trainings/:trainingId/:fromSearch?',
					// console.log('path',path),
					element: <Training />
				}
			]
		}
	]
};
export default TrainingAppConfig;
