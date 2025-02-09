import { Navigate } from 'react-router-dom';
import ShortlistedCandidate from './shortlistedCandidate/ShortlistedCandidate';
import ShortlistedCandidateApp from './ShortlistedCandidateApp';
import ShortlistedCandidates from './shortlistedCandidates/ShortlistedCandidates';

/**
 * The E-Commerce app configuration.
 */

const ShortlistedCandidateAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ShortlistedCandidate',
      element: <ShortlistedCandidateApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ShortlistedCandidates' />,
        },
        {
          path: 'ShortlistedCandidates',
          element: <ShortlistedCandidates />,
        },
        {
          path: 'ShortlistedCandidates/:ShortlistedCandidateId/*',
          element: <ShortlistedCandidate />,
        },
      ],
    },
  ],
};
export default ShortlistedCandidateAppConfig;
