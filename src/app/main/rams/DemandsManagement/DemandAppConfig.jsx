import { Navigate } from 'react-router-dom';
import DemandApp from './DemandApp';
import Demands from './demands/Demands';
import Demand from './demand/Demand';

/**
 * The E-Commerce app configuration.
 */
const DemandAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/demand',
      element: <DemandApp />,
      children: [
        {
          path: '',
          element: <Navigate to='demands' />,
        },
        {
          path: 'demands',
          element: <Demands />,
        },

        {
          path: 'demands/:demandId/*',
          element: <Demand />,
        },
      ],
    },
  ],
};
export default DemandAppConfig;
