import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  DELETE_PASSENGER_LEDGER_DELIVERY,
  GET_PASSENGER_DELIVERY_REPORT,
  GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG,
  POSTDATE_FILTER_BY,
  POSTDATE_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerDeliveryReports'];
const PassengerDeliveryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerDeliveryReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_DELIVERY_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerDeliveryReports'],
      }),
      getPassengerDeliveryAllReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passengerDeliveryReports'],
      }),
      deletePassengerDelivery: build.mutation({
        query: (passengerDeliveryId) => ({
          url: `${DELETE_PASSENGER_LEDGER_DELIVERY}${passengerDeliveryId.ids}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['PassengerDeliverys'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerDeliveryReportApi;
export const {
  useGetPassengerDeliveryReportsQuery,
  useGetPassengerDeliveryAllReportsQuery,
  useDeletePassengerDeliveryMutation,
} = PassengerDeliveryReportApi;

export const selectFilteredPassengerDeliveryReports = (
  passengerDeliveryReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerDeliveryReports;
    }

    return FuseUtils.filterArrayByString(passengerDeliveryReports, searchText);
  });
