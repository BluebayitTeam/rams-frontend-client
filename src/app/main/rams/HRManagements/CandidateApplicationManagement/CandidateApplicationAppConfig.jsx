import { Navigate } from 'react-router-dom';
import CandidateApplication from './candidateApplication/CandidateApplication';
import CandidateApplicationApp from './CandidateApplicationApp';
import CandidateApplications from './candidateApplications/CandidateApplications';

/**
 * The E-Commerce app configuration.
 */

const CandidateApplicationAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/CandidateApplication',
      element: <CandidateApplicationApp />,
      children: [
        {
          path: '',
          element: <Navigate to='CandidateApplications' />,
        },
        {
          path: 'CandidateApplications',
          element: <CandidateApplications />,
        },
        {
          path: 'CandidateApplications/:CandidateApplicationId/',
          element: <CandidateApplication />,
        },
      ],
    },
  ],
};
export default CandidateApplicationAppConfig;
