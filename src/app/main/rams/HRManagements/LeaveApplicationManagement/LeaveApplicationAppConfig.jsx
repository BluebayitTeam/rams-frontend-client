import { Navigate } from 'react-router-dom';
import LeaveApplication from './leaveApplication/LeaveApplication';
import LeaveApplicationApp from './LeaveApplicationApp';
import LeaveApplications from './LeaveApplications/LeaveApplications';

/**
 * The E-Commerce app configuration.
 */

const LeaveApplicationAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/LeaveApplication',
      element: <LeaveApplicationApp />,
      children: [
        {
          path: '',
          element: <Navigate to='LeaveApplications' />,
        },
        {
          path: 'LeaveApplications',
          element: <LeaveApplications />,
        },
        {
          path: 'LeaveApplications/:LeaveApplicationId/*',
          element: <LeaveApplication />,
        },
      ],
    },
  ],
};
export default LeaveApplicationAppConfig;
