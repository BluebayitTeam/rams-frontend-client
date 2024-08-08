import { Navigate } from 'react-router-dom';
import PoliceStationApp from './PoliceStationApp';
import PoliceStations from './policeStations/PoliceStations';
import PoliceStation from './policeStation/PoliceStation';

/**
 * The E-Commerce app configuration.
 */
const PoliceStationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/policeStation',
			element: <PoliceStationApp />,
			children: [
				{
					path: '',
					element: <Navigate to="policeStations" />
				},
				{
					path: 'policeStations',
					element: <PoliceStations />
				},
				{
					path: 'policeStations/:policeStationId/*',
					element: <PoliceStation />
				}
			]
		}
	]
};
export default PoliceStationAppConfig;
