import { Navigate } from 'react-router-dom';
import ImmigrationClearanceMalaysiaReportApp from './ImmigrationClearanceMalaysiaReportApp';
import ImmigrationClearanceMalaysiasReport from './immigrationClearance/ImmigrationClearanceMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const ImmigrationClearanceMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/immigrationclearanceMalaysiaReport',
      element: <ImmigrationClearanceMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='immigrationclearanceMalaysiaReports' />,
        },

        {
          path: 'immigrationclearanceMalaysiaReports/:immigrationclearanceMalaysiaReportId?/*',
          element: <ImmigrationClearanceMalaysiasReport />,
        },
      ],
    },
  ],
};
export default ImmigrationClearanceMalaysiaReportAppConfig;
