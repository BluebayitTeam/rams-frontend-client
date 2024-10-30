import { Navigate } from 'react-router-dom';
import MedicalExpireReportApp from './MedicalExpireReportApp';
import MedicalExpiresReport from './medicalExpire/MedicalExpireReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalExpireReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalExpireReport',
      element: <MedicalExpireReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalExpireReports' />,
        },

        {
          path: 'medicalExpireReports/:medicalExpireReportId?/*',
          element: <MedicalExpiresReport />,
        },
      ],
    },
  ],
};
export default MedicalExpireReportAppConfig;
