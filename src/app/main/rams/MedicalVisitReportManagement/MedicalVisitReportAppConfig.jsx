import { Navigate } from 'react-router-dom';
import MedicalVisitReportApp from './MedicalVisitReportApp';
import MedicalVisitsReport from './medicalVisit/MedicalVisitReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalVisitReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalVisitReport',
      element: <MedicalVisitReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalVisitReports' />,
        },

        {
          path: 'medicalVisitReports/:medicalVisitReportId?/*',
          element: <MedicalVisitsReport />,
        },
      ],
    },
  ],
};
export default MedicalVisitReportAppConfig;
