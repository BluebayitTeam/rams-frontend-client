import { Navigate } from 'react-router-dom';
import MedicalFitReportApp from './MedicalFitReportApp';
import MedicalFitsReport from './medicalFit/MedicalFitReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalFitReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalFitReport',
      element: <MedicalFitReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalFitReports' />,
        },

        {
          path: 'medicalFitReports/:medicalFitReportId?/*',
          element: <MedicalFitsReport />,
        },
      ],
    },
  ],
};
export default MedicalFitReportAppConfig;
