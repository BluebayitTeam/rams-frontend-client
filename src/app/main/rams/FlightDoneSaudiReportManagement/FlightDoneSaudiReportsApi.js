import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { FLIGHT_FILTER_SAUDI_BY } from 'src/app/constant/constants';

export const addTagTypes = ['flightDoneSaudiReports'];
const FlightDoneSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getFlightDoneSaudiReports: build.query({
        query: (filterData) => ({
          url: FLIGHT_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['flightDoneSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default FlightDoneSaudiReportApi;
export const { useGetFlightDoneSaudiReportsQuery } = FlightDoneSaudiReportApi;

export const selectFilteredFlightDoneSaudiReports = (flightDoneSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return flightDoneSaudiReports;
    }

    return FuseUtils.filterArrayByString(flightDoneSaudiReports, searchText);
  });
