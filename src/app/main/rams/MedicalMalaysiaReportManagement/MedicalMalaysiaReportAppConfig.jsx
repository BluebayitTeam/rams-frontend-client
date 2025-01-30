import { Navigate } from 'react-router-dom';
import MedicalMalaysiaReportApp from './MedicalMalaysiaReportApp';
import MedicalMalaysiasReport from './medicalMalaysia/MedicalMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalMalaysiaReport',
      element: <MedicalMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalMalaysiaReports' />,
        },

        {
          path: 'medicalMalaysiaReports/:medicalMalaysiaReportId?/*',
          element: <MedicalMalaysiasReport />,
        },
      ],
    },
  ],
};
export default MedicalMalaysiaReportAppConfig;
