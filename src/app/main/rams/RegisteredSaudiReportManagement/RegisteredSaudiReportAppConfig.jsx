import { Navigate } from 'react-router-dom';
import RegisteredSaudiReportApp from './RegisteredSaudiReportApp';
import RegisteredSaudisReport from './registeredSaudi/RegisteredSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const RegisteredSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/registeredSaudiReport',
      element: <RegisteredSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='registeredSaudiReports' />,
        },

        {
          path: 'registeredSaudiReports/:registeredSaudiReportId?/*',
          element: <RegisteredSaudisReport />,
        },
      ],
    },
  ],
};
export default RegisteredSaudiReportAppConfig;
