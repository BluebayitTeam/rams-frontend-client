import { Navigate } from 'react-router-dom';
import Schedule from './schedule/Schedule';
import ScheduleApp from './ScheduleApp';
import Schedules from './schedules/Schedules';

/**
 * The E-Commerce app configuration.
 */

// apps/schedule/schedules

const ScheduleAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/schedule',
			element: <ScheduleApp />,
			children: [
				{
					path: '',
					element: <Navigate to="schedules" />
				},
				{
					path: 'schedules',
					element: <Schedules />
				},
				{
					path: 'schedules/:scheduleId/*',
					element: <Schedule />
				}
			]
		}
	]
};
export default ScheduleAppConfig;
