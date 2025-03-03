import { Navigate } from 'react-router-dom';
import DesignationApp from './DesignationApp';
import Designations from './designations/Designations';
import Designation from './designation/Designation';

/**
 * The E-Commerce app configuration.
 */
const DesignationAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/designation',
      element: <DesignationApp />,
      children: [
        {
          path: '',
          element: <Navigate to='designations' />,
        },
        {
          path: 'designations',
          element: <Designations />,
        },
        {
          path: 'designations/:designationId?/:designationName/*',
          element: <Designation />,
        },
      ],
    },
  ],
};
export default DesignationAppConfig;
