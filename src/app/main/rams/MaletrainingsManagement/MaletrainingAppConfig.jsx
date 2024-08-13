import { Navigate } from 'react-router-dom';
import MaletrainingApp from './MaletrainingApp';
import Maletraining from './maletraining/Maletraining';

/**
 * The E-Commerce app configuration.
 */
const MaletrainingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/maletraining',
			element: <MaletrainingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="maletrainings" />
				},

				{
					path: 'maletrainings/:maletrainingId?/*',
					element: <Maletraining />
				}
			]
		}
	]
};
export default MaletrainingAppConfig;
