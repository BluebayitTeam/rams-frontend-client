import { Navigate } from 'react-router-dom';
import AssignPayhead from './assignPayhead/AssignPayhead';
import AssignPayheadApp from './AssignPayheadApp';
import AssignPayheads from './assignPayheads/AssignPayheads';

/**
 * The E-Commerce app configuration.
 */

const AssignPayheadAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/assignPayhead',
      element: <AssignPayheadApp />,
      children: [
        {
          path: '',
          element: <Navigate to='assignPayheads' />,
        },
        {
          path: 'assignPayheads',
          element: <AssignPayheads />,
        },
        {
          path: 'assignPayheads/:assignPayheadId/*',
          element: <AssignPayhead />,
        },
      ],
    },
  ],
};
export default AssignPayheadAppConfig;
