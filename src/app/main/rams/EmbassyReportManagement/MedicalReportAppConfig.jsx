import { Navigate } from 'react-router-dom';
import MedicalReportApp from './MedicalReportApp';
import MedicalReport from './embassyReport/EmbassyReport';

/**
 * The E-Commerce app configuration.
 */
const MedicalReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/medicalReport',
      element: <MedicalReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='medicalReports' />,
        },

        {
          path: 'medicalReports/:medicalReportId?/*',
          element: <MedicalReport />,
        },
      ],
    },
  ],
};
export default MedicalReportAppConfig;
