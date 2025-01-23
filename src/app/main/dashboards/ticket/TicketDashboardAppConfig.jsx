import { lazy } from 'react';

const TicketDashboardApp = lazy(() => import('./TicketDashboardApp'));
/**
 * The TicketDashboardApp configuration.
 */
const TicketDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards/ticket',
      element: <TicketDashboardApp />,
    },
  ],
};
export default TicketDashboardAppConfig;
