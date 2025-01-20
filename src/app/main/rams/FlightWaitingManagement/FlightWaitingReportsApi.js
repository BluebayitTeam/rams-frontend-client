import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_FLIGHT_FLIGHT_WAITING_LIST,
  GET_FLIGHT_FLIGHT_WAITING_LIST_WITHOUT_PG,
  GET_MANPOWER_WAITING_LIST,
  GET_MANPOWER_WAITING_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['flightWaitingReports'];
const FlightWaitingReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightWaitingReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_WAITING_LIST,
          params: filterData,
        }),
        providesTags: ['flightWaitingReports'],
      }),
      getFlightWaitingAllReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_WAITING_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['flightWaitingReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightWaitingReportApi;
export const {
  useGetFlightWaitingReportsQuery,
  useGetFlightWaitingAllReportsQuery,
} = FlightWaitingReportApi;

export const selectFilteredFlightWaitingReports = (flightWaitingReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightWaitingReports;
    }

    return FuseUtils.filterArrayByString(flightWaitingReports, searchText);
  });
