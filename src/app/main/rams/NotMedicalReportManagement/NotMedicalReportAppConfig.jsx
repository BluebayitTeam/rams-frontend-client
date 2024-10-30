import { Navigate } from 'react-router-dom';
import NotMedicalReportApp from './NotMedicalReportApp';
import NotMedicalsReport from './notMedical/NotMedicalReport';

/**
 * The E-Commerce app configuration.
 */
const NotMedicalReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/notMedicalReport',
      element: <NotMedicalReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='notMedicalReports' />,
        },

        {
          path: 'notMedicalReports/:notMedicalReportId?/*',
          element: <NotMedicalsReport />,
        },
      ],
    },
  ],
};
export default NotMedicalReportAppConfig;
