import { Navigate } from 'react-router-dom';
import AutoStatusUpdateApp from './AutoStatusUpdateApp';
import AutoStatusUpdate from './autoStatusUpdate/AutoStatusUpdate';

/**
 * The E-Commerce app configuration.
 */
const AutoStatusUpdateAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/autoStatusUpdate',
      element: <AutoStatusUpdateApp />,
      children: [
        {
          path: '',
          element: <Navigate to='autoStatusUpdates' />,
        },

        {
          path: 'autoStatusUpdates/:autoStatusUpdateId?/*',
          element: <AutoStatusUpdate />,
        },
      ],
    },
  ],
};
export default AutoStatusUpdateAppConfig;
