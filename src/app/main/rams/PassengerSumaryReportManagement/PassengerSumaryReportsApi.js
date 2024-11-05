import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  MANPOWER_FILTER_BY,
  MANPOWER_FILTER_WITHOUT_PG,
  PASSENGER_SUMMARY_FILTER_BY,
  PASSENGER_SUMMARY_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerSumaryReports'];
const PassengerSumaryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerSumaryReports: build.query({
        query: (filterData) => ({
          url: PASSENGER_SUMMARY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['passengerSumaryReports'],
      }),
      getPassengerSumaryAllReports: build.query({
        query: (filterData) => ({
          url: PASSENGER_SUMMARY_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passengerSumaryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerSumaryReportApi;
export const {
  useGetPassengerSumaryReportsQuery,
  useGetPassengerSumaryAllReportsQuery,
} = PassengerSumaryReportApi;

export const selectFilteredPassengerSumaryReports = (passengerSumaryReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerSumaryReports;
    }

    return FuseUtils.filterArrayByString(passengerSumaryReports, searchText);
  });
