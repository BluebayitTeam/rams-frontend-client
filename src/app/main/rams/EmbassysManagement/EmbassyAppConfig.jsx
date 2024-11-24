import { Navigate } from 'react-router-dom';
import EmbassyApp from './EmbassyApp';
import Embassy from './embassy/Embassy';

/**
 * The E-Commerce app configuration.
 */
const EmbassyAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/embassy-management',
      element: <EmbassyApp />,
      children: [
        {
          path: '',
          element: <Navigate to='embassys' />,
        },

        {
          path: 'embassys/:embassyId?',
          element: <Embassy />,
        },
      ],
    },
  ],
};
export default EmbassyAppConfig;
