import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
  GET_FLIGHT_FLIGHT_WAITING_LIST,
  GET_FLIGHT_FLIGHT_WAITING_LIST_WITHOUT_PG,
  GET_MANPOWER_WAITING_LIST,
  GET_MANPOWER_WAITING_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['flightDoneReports'];
const FlightDoneReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightDoneReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_DONE_LIST,
          params: filterData,
        }),
        providesTags: ['flightDoneReports'],
      }),
      getFlightDoneAllReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['flightDoneReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightDoneReportApi;
export const { useGetFlightDoneReportsQuery, useGetFlightDoneAllReportsQuery } =
  FlightDoneReportApi;

export const selectFilteredFlightDoneReports = (flightDoneReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightDoneReports;
    }

    return FuseUtils.filterArrayByString(flightDoneReports, searchText);
  });
