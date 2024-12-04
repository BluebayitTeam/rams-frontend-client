import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  GET_PASSENGER_DELIVERY_REPORT,
  GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG,
  POSTDATE_FILTER_BY,
  POSTDATE_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerDeliverys'];
const PassengerDeliveryApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerDeliverys: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_DELIVERY_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerDeliverys'],
      }),
      getPassengerDeliveryAllReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passengerDeliverys'],
      }),
      deletePassengerDelivery: build.mutation({
        query: (PassengerDeliveryId) => ({
          url: `${DELETE_PassengerDelivery}${PassengerDeliveryId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['PassengerDeliverys'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerDeliveryApi;
export const {
  useGetPassengerDeliverysQuery,
  useGetPassengerDeliveryAllReportsQuery,
  useDeletePassengerDeliveryMutation,
} = PassengerDeliveryApi;

export const selectFilteredPassengerDeliverys = (passengerDeliverys) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerDeliverys;
    }

    return FuseUtils.filterArrayByString(passengerDeliverys, searchText);
  });
