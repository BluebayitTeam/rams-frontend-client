import { Navigate } from 'react-router-dom';
import LeaveType from './leaveType/LeaveType';
import LeaveTypeApp from './LeaveTypeApp';
import LeaveTypes from './leaveTypes/LeaveTypes';

/**
 * The E-Commerce app configuration.
 */

const LeaveTypeAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/LeaveType',
      element: <LeaveTypeApp />,
      children: [
        {
          path: '',
          element: <Navigate to='LeaveTypes' />,
        },
        {
          path: 'LeaveTypes',
          element: <LeaveTypes />,
        },
        {
          path: 'LeaveTypes/:LeaveTypeId/*',
          element: <LeaveType />,
        },
      ],
    },
  ],
};
export default LeaveTypeAppConfig;
