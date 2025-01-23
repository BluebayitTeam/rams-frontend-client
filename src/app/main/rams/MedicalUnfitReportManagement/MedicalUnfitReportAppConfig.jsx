import { Navigate } from 'react-router-dom';
import MedicalUnfitReportApp from './MedicalUnfitReportApp';
import MedicalUnfitsReport from './medicalUnfit/MedicalUnfitReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalUnfitReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalUnfitReport',
      element: <MedicalUnfitReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalUnfitReports' />,
        },

        {
          path: 'medicalUnfitReports/:medicalUnfitReportId?/*',
          element: <MedicalUnfitsReport />,
        },
      ],
    },
  ],
};
export default MedicalUnfitReportAppConfig;
