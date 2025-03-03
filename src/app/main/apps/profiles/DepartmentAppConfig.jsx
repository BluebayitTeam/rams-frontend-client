import { Navigate } from 'react-router-dom';
import DepartmentApp from './DepartmentApp';
import Departments from './profiless/Profiless';
import Department from './profiles/Profiles';

/**
 * The E-Commerce app configuration.
 */
const DepartmentAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/department',
      element: <DepartmentApp />,
      children: [
        {
          path: '',
          element: <Navigate to='departments' />,
        },
        {
          path: 'departments',
          element: <Departments />,
        },
        {
          path: 'departments/:departmentId?/:departmentName/*',
          element: <Department />,
        },
      ],
    },
  ],
};
export default DepartmentAppConfig;
