import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['totalTicketReports'];
const TotalTicketReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTotalTicketReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_DONE_LIST,
          params: filterData,
        }),
        providesTags: ['totalTicketReports'],
      }),
      getTotalTicketAllReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['totalTicketReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TotalTicketReportApi;
export const {
  useGetTotalTicketReportsQuery,
  useGetTotalTicketAllReportsQuery,
} = TotalTicketReportApi;

export const selectFilteredTotalTicketReports = (totalTicketReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return totalTicketReports;
    }

    return FuseUtils.filterArrayByString(totalTicketReports, searchText);
  });
