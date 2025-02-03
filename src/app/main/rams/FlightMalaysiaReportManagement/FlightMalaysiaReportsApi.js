import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { FLIGHT_FOR_CALLING_DATA_REPORT } from 'src/app/constant/constants';

export const addTagTypes = ['flightMalaysiaReports'];
const FlightMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightMalaysiaReports: build.query({
        query: (filterData) => ({
          url: FLIGHT_FOR_CALLING_DATA_REPORT,
          params: filterData,
        }),
        providesTags: ['flightMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightMalaysiaReportApi;
export const { useGetFlightMalaysiaReportsQuery } = FlightMalaysiaReportApi;

export const selectFilteredFlightMalaysiaReports = (flightMalaysiaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(flightMalaysiaReports, searchText);
  });
