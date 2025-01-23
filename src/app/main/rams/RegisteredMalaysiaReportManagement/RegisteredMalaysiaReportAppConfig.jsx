import { Navigate } from 'react-router-dom';
import RegisteredMalaysiaReportApp from './RegisteredMalaysiaReportApp';
import RegisteredMalaysiasReport from './registeredMalaysia/RegisteredMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const RegisteredMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/registeredMalaysiaReport',
      element: <RegisteredMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='registeredMalaysiaReports' />,
        },

        {
          path: 'registeredMalaysiaReports/:registeredMalaysiaReportId?/*',
          element: <RegisteredMalaysiasReport />,
        },
      ],
    },
  ],
};
export default RegisteredMalaysiaReportAppConfig;
