import { Navigate } from 'react-router-dom';
import DistrictApp from './DistrictApp';
import Districts from './districts/Districts';
import District from './district/District';

/**
 * The E-Commerce app configuration.
 */
const DistrictAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/district',
			element: <DistrictApp />,
			children: [
				{
					path: '',
					element: <Navigate to="districts" />
				},
				{
					path: 'districts',
					element: <Districts />
				},
				{
					path: 'districts/:districtId/*',
					element: <District />
				}
			]
		}
	]
};
export default DistrictAppConfig;
