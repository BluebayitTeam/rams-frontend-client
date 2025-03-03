import { apiService as api } from 'app/store/apiService';
import { GET_USER_PROFILE } from 'src/app/constant/constants';

export const addTagTypes = [
  'profile_photos_videos',
  'profile_timeline',
  'profile_about',
];
const ProfileApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProfilePhotosVideos: build.query({
        query: () => ({ url: GET_USER_PROFILE }),
        providesTags: ['profile_photos_videos'],
      }),
      getProfileTimeline: build.query({
        query: () => ({ url: `/mock-api/profile/timeline` }),
        providesTags: ['profile_timeline'],
      }),
      getProfileAbout: build.query({
        query: () => ({ url: `/mock-api/profile/about` }),
        providesTags: ['profile_about'],
      }),
    }),
    overrideExisting: false,
  });
export default ProfileApi;
export const {
  useGetProfilePhotosVideosQuery,
  useGetProfileTimelineQuery,
  useGetProfileAboutQuery,
} = ProfileApi;
