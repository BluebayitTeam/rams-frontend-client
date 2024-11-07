import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
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
          url: POSTDATE_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['passengerDeliveryReports'],
      }),
      getPassengerDeliveryAllReports: build.query({
        query: (filterData) => ({
          url: POSTDATE_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passengerDeliveryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerDeliveryReportApi;
export const {
  useGetPassengerDeliveryReportsQuery,
  useGetPassengerDeliveryAllReportsQuery,
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
