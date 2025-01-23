import { Navigate } from 'react-router-dom';
import MedicalSaudiReportApp from './MedicalSaudiReportApp';
import MedicalSaudiReport from './medicalSaudiReport/MedicalSaudiReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalSaudiReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalSaudiReport',
      element: <MedicalSaudiReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalSaudiReports' />,
        },

        {
          path: 'medicalSaudiReports/:medicalSaudiReportId?/*',
          element: <MedicalSaudiReport />,
        },
      ],
    },
  ],
};
export default MedicalSaudiReportAppConfig;
