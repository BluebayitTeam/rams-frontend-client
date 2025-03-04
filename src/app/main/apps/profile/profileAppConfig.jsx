import { Navigate } from 'react-router-dom';
import ProfileApp from './ProfileApp';
import Profiles from './profiles/profiles';
import Profile from './profile/Profile';

/**
 * The E-Commerce app configuration.
 */
const ProfileAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/profile',
      element: <ProfileApp />,
      children: [
        {
          path: '',
          element: <Navigate to='profiles' />,
        },
        {
          path: 'profiles',
          element: <Profiles />,
        },
        {
          path: 'profiles/:profileId/*',
          element: <Profile />,
        },
      ],
    },
  ],
};
export default ProfileAppConfig;
