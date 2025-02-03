import { Navigate } from 'react-router-dom';
import DownloadScheduleApp from './DownloadScheduleApp';
import DownloadSchedules from './DownloadSchedules/DownloadSchedules';

/**
 * The E-Commerce app configuration.
 */

// apps/importSchedule/importSchedules

const DownloadScheduleAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/importSchedule',
			element: <DownloadScheduleApp />,
			children: [
				{
					path: '',
					element: <Navigate to="importSchedules" />
				},
				{
					path: 'importSchedules',
					element: <DownloadSchedules />
				},
			]
		}
	]
};
export default DownloadScheduleAppConfig;
