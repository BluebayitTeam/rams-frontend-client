import { Navigate } from 'react-router-dom';
import DepartmentApp from './DepartmentApp';
import Departments from './departments/Departments';
import Department from './department/Department';

/**
 * The E-Commerce app configuration.
 */
const DepartmentAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/department',
			element: <DepartmentApp />,
			children: [
				{
					path: '',
					element: <Navigate to="departments" />
				},
				{
					path: 'departments',
					element: <Departments />
				},
				{
					path: 'departments/:departmentId/*',
					element: <Department />
				}
			]
		}
	]
};
export default DepartmentAppConfig;
