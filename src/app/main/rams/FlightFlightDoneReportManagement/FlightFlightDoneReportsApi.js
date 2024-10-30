import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['flightFlightDoneReports'];
const FlightFlightDoneReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightFlightDoneReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_DONE_LIST,
          params: filterData,
        }),
        providesTags: ['flightFlightDoneReports'],
      }),
      getFlightFlightDoneAllReports: build.query({
        query: (filterData) => ({
          url: GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['flightFlightDoneReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightFlightDoneReportApi;
export const {
  useGetFlightFlightDoneReportsQuery,
  useGetFlightFlightDoneAllReportsQuery,
} = FlightFlightDoneReportApi;

export const selectFilteredFlightFlightDoneReports = (
  flightFlightDoneReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightFlightDoneReports;
    }

    return FuseUtils.filterArrayByString(flightFlightDoneReports, searchText);
  });
