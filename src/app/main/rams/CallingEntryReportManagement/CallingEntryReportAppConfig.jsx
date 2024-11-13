import { Navigate } from 'react-router-dom';
import CallingEntryReportApp from './CallingEntryReportApp';
import CallingEntryReport from './callingEntryReport/CallingEntry';

/**
 * The E-Commerce app configuration.
 */
const CallingEntryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/callingEntryReport',
      element: <CallingEntryReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='callingEntryReports' />,
        },

        {
          path: 'callingEntryReports/:callingEntryReportId?/*',
          element: <CallingEntryReport />,
        },
      ],
    },
  ],
};
export default CallingEntryReportAppConfig;
