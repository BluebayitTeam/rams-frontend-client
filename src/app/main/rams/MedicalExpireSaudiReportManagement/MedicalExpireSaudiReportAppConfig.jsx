import { Navigate } from 'react-router-dom';
import MedicalExpireSaudiReportApp from './MedicalExpireSaudiReportApp';
import MedicalExpireSaudisReport from './medicalExpireSaudi/MedicalExpireSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalExpireSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalExpireSaudiReport',
      element: <MedicalExpireSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalExpireSaudiReports' />,
        },

        {
          path: 'medicalExpireSaudiReports/:noOfDays?/:country?/*',
          element: <MedicalExpireSaudisReport />,
        },
      ],
    },
  ],
};
export default MedicalExpireSaudiReportAppConfig;
