import { lazy } from 'react';

const SaudiDashboardApp = lazy(() => import('./SaudiDashboardApp'));
/**
 * The SaudiDashboardApp configuration.
 */
const SaudiDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards/saudi',
      element: <SaudiDashboardApp />,
    },
  ],
};
export default SaudiDashboardAppConfig;
