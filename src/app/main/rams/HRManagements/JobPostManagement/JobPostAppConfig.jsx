import { Navigate } from 'react-router-dom';
import JobPost from './JobPost/JobPost';
import JobPostApp from './JobPostApp';
import JobPosts from './jobPosts/JobPosts';

/**
 * The E-Commerce app configuration.
 */

const JobPostAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/JobPost',
      element: <JobPostApp />,
      children: [
        {
          path: '',
          element: <Navigate to='JobPosts' />,
        },
        {
          path: 'JobPosts',
          element: <JobPosts />,
        },
        {
          path: 'JobPosts/:JobPostId/*',
          element: <JobPost />,
        },
      ],
    },
  ],
};
export default JobPostAppConfig;
