import { Navigate } from 'react-router-dom';
import PackageDetailApp from './PackageDetailApp';
import PackageDetail from './packageDetail/PackageDetail';

/**
 * The E-Commerce app configuration.
 */
const PackageDetailAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/packageDetail',
			element: <PackageDetailApp />,
			children: [
				{
					path: '',
					element: <Navigate to="packageDetails" />
				},

				{
					path: 'packageDetails/:packageDetailId/*',
					element: <PackageDetail />
				}
			]
		}
	]
};
export default PackageDetailAppConfig;
