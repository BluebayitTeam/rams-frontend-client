import { Navigate } from 'react-router-dom';
import FeatureDetailApp from './FeatureDetailApp';
import FeatureDetails from './featureDetails/FeatureDetails';
import FeatureDetail from './featureDetail/FeatureDetail';

/**
 * The E-Commerce app configuration.
 */
const FeatureDetailAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/featureDetail',
			element: <FeatureDetailApp />,
			children: [
				{
					path: '',
					element: <Navigate to="featureDetails" />
				},
				{
					path: 'featureDetails',
					element: <FeatureDetails />
				},
				{
					path: 'featureDetails/:featureDetailId/*',
					element: <FeatureDetail />
				}
			]
		}
	]
};
export default FeatureDetailAppConfig;
