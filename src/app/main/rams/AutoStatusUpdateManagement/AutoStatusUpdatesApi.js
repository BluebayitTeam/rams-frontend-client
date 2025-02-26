import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID, POST_CORN_JOB } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['autoStatusUpdates'];

const AutoStatusUpdateApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAutoStatusUpdate: build.query({
        query: (autoStatusUpdateId) => ({
          url: `${POST_CORN_JOB}`,
        }),
        providesTags: ['autoStatusUpdates'],
      }),
    }),
    overrideExisting: false,
  });

export default AutoStatusUpdateApi;

export const { useGetAutoStatusUpdatesQuery, useGetAutoStatusUpdateQuery } =
  AutoStatusUpdateApi;

export const selectFilteredAutoStatusUpdates = (autoStatusUpdates) =>
  createSelector([selectSearchText], (searchText) => {
    if (!searchText || searchText.length === 0) {
      return autoStatusUpdates;
    }

    return FuseUtils.filterArrayByString(autoStatusUpdates, searchText);
  });
