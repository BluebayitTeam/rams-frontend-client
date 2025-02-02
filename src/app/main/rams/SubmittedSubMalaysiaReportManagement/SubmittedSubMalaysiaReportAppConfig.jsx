import { Navigate } from 'react-router-dom';
import SubmittedSubMalaysiaReportApp from './SubmittedSubMalaysiaReportApp';
import SubmittedSubMalaysiasReport from './submittedsubMalaysia/SubmittedSubMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const SubmittedSubMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/submittedsubMalaysiaReport',
      element: <SubmittedSubMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='submittedsubMalaysiaReports' />,
        },

        {
          path: 'submittedsubMalaysiaReports/:submittedsubMalaysiaReportId?/*',
          element: <SubmittedSubMalaysiasReport />,
        },
      ],
    },
  ],
};
export default SubmittedSubMalaysiaReportAppConfig;
