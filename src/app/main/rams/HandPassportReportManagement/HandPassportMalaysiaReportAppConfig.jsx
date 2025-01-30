import { Navigate } from 'react-router-dom';
import HandPassportMalaysiaReportApp from './HandPassportMalaysiaReportApp';
import HandPassportMalaysiasReport from './handPassport/HandPassportMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const HandPassportMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/handpassportMalaysiaReport',
      element: <HandPassportMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='handpassportMalaysiaReports' />,
        },

        {
          path: 'handpassportMalaysiaReports/:handpassportMalaysiaReportId?/*',
          element: <HandPassportMalaysiasReport />,
        },
      ],
    },
  ],
};
export default HandPassportMalaysiaReportAppConfig;
