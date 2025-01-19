import { Navigate } from 'react-router-dom';
import AttendanceType from './attendanceType/AttendanceType';
import AttendanceTypeApp from './AttendanceTypeApp';
import AttendanceTypes from './attendanceTypes/AttendanceTypes';

/**
 * The E-Commerce app configuration.
 */

// apps/attendanceType/attendanceTypes

const AttendanceTypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/attendanceType',
			element: <AttendanceTypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="attendanceTypes" />
				},
				{
					path: 'attendanceTypes',
					element: <AttendanceTypes />
				},
				{
					path: 'attendanceTypes/:attendanceTypeId/*',
					element: <AttendanceType />
				}
			]
		}
	]
};
export default AttendanceTypeAppConfig;
