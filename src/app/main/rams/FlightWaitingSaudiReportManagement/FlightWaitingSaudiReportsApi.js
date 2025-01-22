import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { FLIGHT_FILTER_SAUDI_BY } from 'src/app/constant/constants';

export const addTagTypes = ['flightWaitingSaudiReports'];
const FlightWaitingSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightWaitingSaudiReports: build.query({
        query: (filterData) => ({
          url: FLIGHT_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['flightWaitingSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightWaitingSaudiReportApi;
export const { useGetFlightWaitingSaudiReportsQuery } =
  FlightWaitingSaudiReportApi;

export const selectFilteredFlightWaitingSaudiReports = (
  flightWaitingSaudiReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightWaitingSaudiReports;
    }

    return FuseUtils.filterArrayByString(flightWaitingSaudiReports, searchText);
  });
