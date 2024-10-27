import { Navigate } from 'react-router-dom';
import ComputeApp from './ComputeApp';
import Computes from './computes/Computes';
import Compute from './compute/Compute';

/**
 * The E-Commerce app configuration.
 */
const ComputeAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/compute',
      element: <ComputeApp />,
      children: [
        {
          path: '',
          element: <Navigate to='computes' />,
        },
        {
          path: 'computes',
          element: <Computes />,
        },
        {
          path: 'computes/:computeId/*',
          element: <Compute />,
        },
      ],
    },
  ],
};
export default ComputeAppConfig;
