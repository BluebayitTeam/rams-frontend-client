import { Navigate } from 'react-router-dom';
import MedicalExpiresReportApp from './MedicalExpiresReportApp';
import MedicalExpiressReport from './medicalExpires/MedicalExpiresReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalExpiresReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalExpiresReport',
      element: <MedicalExpiresReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalExpiresReports' />,
        },

        {
          path: 'medicalExpiresReports/:noOfDays?/*',
          element: <MedicalExpiressReport />,
        },
      ],
    },
  ],
};
export default MedicalExpiresReportAppConfig;
