import { Navigate } from 'react-router-dom';
import CvFemaleApp from './CvFemaleApp';
import CvFemales from './cvFemales/CvFemales';
import CvFemale from './cvFemale/CvFemale';

/**
 * The E-Commerce app configuration.
 */
const CvFemaleAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/cvFemale',
			element: <CvFemaleApp />,
			children: [
				{
					path: '',
					element: <Navigate to="cvFemales" />
				},
				{
					path: 'cvFemales',
					element: <CvFemales />
				},

				{
					path: 'cvFemales/:cvFemaleId/*',
					element: <CvFemale />
				}
			]
		}
	]
};
export default CvFemaleAppConfig;
