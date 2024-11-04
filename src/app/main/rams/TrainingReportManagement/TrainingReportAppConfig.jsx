import { Navigate } from 'react-router-dom';
import TrainingReportApp from './TrainingReportApp';
import TrainingReport from './trainingReport/TrainingReport';

/**
 * The E-Commerce app configuration.
 */
const TrainingReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/trainingReport',
      element: <TrainingReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='trainingReports' />,
        },

        {
          path: 'trainingReports/:trainingReportId?/*',
          element: <TrainingReport />,
        },
      ],
    },
  ],
};
export default TrainingReportAppConfig;
