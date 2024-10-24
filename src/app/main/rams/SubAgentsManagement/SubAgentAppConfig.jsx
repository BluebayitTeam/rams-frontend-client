import { Navigate } from 'react-router-dom';
import SubAgentApp from './SubAgentApp';
import SubAgents from './subAgents/SubAgents';
import SubAgent from './subAgent/SubAgent';

/**
 * The E-Commerce app configuration.
 */
const SubAgentAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/subAgent',
      element: <SubAgentApp />,
      children: [
        {
          path: '',
          element: <Navigate to='subAgents' />,
        },
        {
          path: 'subAgents',
          element: <SubAgents />,
        },

        {
          path: 'subAgents/:subAgentId/*',
          element: <SubAgent />,
        },
      ],
    },
  ],
};
export default SubAgentAppConfig;
