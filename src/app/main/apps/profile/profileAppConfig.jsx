import { lazy } from 'react';
import Profile from './profile/profile';

const ProfileApp = lazy(() => import('./ProfileApp'));
/**
 * The Profile app config.
 */
const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    // {
    // 	path: 'apps/profile',
    // 	element: <ProfileApp />
    // }
    {
      path: 'apps/profile',
      element: <ProfileApp />,
      children: [
        {
          path: '',
          element: <Navigate to='profile' />,
        },

        {
          path: 'profile/:profileId/*',
          element: <Profile />,
        },
      ],
    },
  ],
};
export default profileAppConfig;
