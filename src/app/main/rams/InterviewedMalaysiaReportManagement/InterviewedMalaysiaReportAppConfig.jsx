import { Navigate } from 'react-router-dom';
import InterviewedMalaysiaReportApp from './InterviewedMalaysiaReportApp';
import InterviewedMalaysiasReport from './interviewedMalaysia/InterviewedMalaysiaReport';

/**
 * The E-Commerce app configuration.
 */
const InterviewedMalaysiaReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/interviewedMalaysiaReport',
      element: <InterviewedMalaysiaReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='interviewedMalaysiaReports' />,
        },

        {
          path: 'interviewedMalaysiaReports/:interviewedMalaysiaReportId?/*',
          element: <InterviewedMalaysiasReport />,
        },
      ],
    },
  ],
};
export default InterviewedMalaysiaReportAppConfig;
