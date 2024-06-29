import { Navigate } from 'react-router-dom';
import CvMaleApp from './CvMaleApp';
import CvMales from './cvMales/CvMales';
import CvMale from './cvBank/CvMale';

/**
 * The E-Commerce app configuration.
 */
const CvMaleAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/cvMale',
			element: <CvMaleApp />,
			children: [
				{
					path: '',
					element: <Navigate to="cvMales" />
				},
				{
					path: 'cvMales',
					element: <CvMales />
				},

				{
					path: 'cvMales/:cvMaleId/*',
					element: <CvMale />
				}
			]
		}
	]
};
export default CvMaleAppConfig;
