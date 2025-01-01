import { lazy } from 'react';

const MalaysiaDashboardApp = lazy(() => import('./MalaysiaDashboardApp'));
/**
 * The MalaysiaDashboardApp configuration.
 */
const MalaysiaDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards/malaysia',
      element: <MalaysiaDashboardApp />,
    },
  ],
};
export default MalaysiaDashboardAppConfig;
