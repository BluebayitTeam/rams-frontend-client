import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from '../AgentsManagement/store/searchTextSlice';

export const addTagTypes = ['passengerEditHistorys'];

const PassengerEditHistoryApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerEditHistory: build.query({
        query: (passengerEditHistoryId) => ({
          url: `${GET_BMET_BY_ID}${passengerEditHistoryId}`,
        }),
        providesTags: ['passengerEditHistorys'],
        async onQueryStarted(passengerEditHistoryId, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error) {
            CustomNotification(
              'error',
              `${error?.error?.response?.data?.detail}`
            );
          }
        },
      }),
    }),
    overrideExisting: false,
  });

export default PassengerEditHistoryApi;

export const {
  useGetPassengerEditHistorysQuery,
  useGetPassengerEditHistoryQuery,
} = PassengerEditHistoryApi;

export const selectFilteredPassengerEditHistorys = (passengerEditHistorys) =>
  createSelector([selectSearchText], (searchText) => {
    if (!searchText || searchText.length === 0) {
      return passengerEditHistorys;
    }

    return FuseUtils.filterArrayByString(passengerEditHistorys, searchText);
  });
