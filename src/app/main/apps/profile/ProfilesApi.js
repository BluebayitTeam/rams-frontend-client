import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_UPDATE,
  USERS_PASSWORDCHANGE,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

export const addTagTypes = ['profiles'];
const ProfileApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProfiles: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_USER_PROFILE,
          params: { page, size, searchKey },
        }),
        providesTags: ['profiles'],
      }),

      updateProfile: build.mutation({
        query: (profile) => ({
          url: `${GET_USER_PROFILE_UPDATE}`,
          method: 'PUT',
          data: jsonToFormData(profile),
        }),
        invalidatesTags: ['profiles'],
      }),
    }),
    overrideExisting: false,
  });
export default ProfileApi;
export const { useGetProfilesQuery, useUpdateProfileMutation } = ProfileApi;

export const selectFilteredProfiles = (profiles) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return profiles;
    }

    return FuseUtils.filterArrayByString(profiles, searchText);
  });
