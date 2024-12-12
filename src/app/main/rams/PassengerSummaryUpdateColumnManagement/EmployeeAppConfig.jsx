import { Navigate } from 'react-router-dom';
import EmployeeApp from './PassengerSummaryUpdateClmApp';
import Employees from './passengerSummaryUpdateClms/PassengerSummaryUpdateClms';
import Employee from './passengerSummaryUpdateClm/PassengerSummaryUpdateClm';

/**
 * The E-Commerce app configuration.
 */
const EmployeeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/employee',
			element: <EmployeeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="employees" />
				},
				{
					path: 'employees',
					element: <Employees />
				},
				{
					path: 'employees/:employeeId/*',
					element: <Employee />
				}
			]
		}
	]
};
export default EmployeeAppConfig;
