import { Navigate } from 'react-router-dom';
import MedicalExpireMalaysiaReportApp from './MedicalExpireMalaysiaReportApp';
import MedicalExpireMalaysiasReport from './medicalExpireMalaysia/MedicalExpireMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalExpireMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalExpireMalaysiaReport',
      element: <MedicalExpireMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalExpireMalaysiaReports' />,
        },

        {
          path: 'medicalExpireMalaysiaReports/:noOfDays?/:country?/*',
          element: <MedicalExpireMalaysiasReport />,
        },
      ],
    },
  ],
};
export default MedicalExpireMalaysiaReportAppConfig;
