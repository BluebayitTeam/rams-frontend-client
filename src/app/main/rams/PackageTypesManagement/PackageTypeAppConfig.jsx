import { Navigate } from 'react-router-dom';
import PackageTypeApp from './PackageTypeApp';
import PackageTypes from './packageTypes/PackageTypes';
import PackageType from './packageType/PackageType';

/**
 * The E-Commerce app configuration.
 */
const PackageTypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/packageType',
			element: <PackageTypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="packageTypes" />
				},
				{
					path: 'packageTypes',
					element: <PackageTypes />
				},
				{
					path: 'packageTypes/:packageTypeId/*',
					element: <PackageType />
				}
			]
		}
	]
};
export default PackageTypeAppConfig;
