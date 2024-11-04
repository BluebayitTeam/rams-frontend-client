import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  MANPOWER_FILTER_BY,
  MANPOWER_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['flightReports'];
const FlightReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightReports: build.query({
        query: (filterData) => ({
          url: MANPOWER_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['flightReports'],
      }),
      getFlightAllReports: build.query({
        query: (filterData) => ({
          url: MANPOWER_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['flightReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightReportApi;
export const { useGetFlightReportsQuery, useGetFlightAllReportsQuery } =
  FlightReportApi;

export const selectFilteredFlightReports = (flightReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightReports;
    }

    return FuseUtils.filterArrayByString(flightReports, searchText);
  });
