import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  PASSENGER_STATUS_OVERVIEW_FILTER_BY,
  PASSENGER_STATUS_OVERVIEW_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerStatusOverviewReports'];
const PassengerStatusOverviewReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerStatusOverviewReports: build.query({
        query: (filterData) => ({
          url: `${PASSENGER_STATUS_OVERVIEW_FILTER_BY}${filterData?.agent}`,

          params: { page: filterData?.page, size: filterData?.size },
        }),
        providesTags: ['passengerStatusOverviewReports'],
      }),
      getPassengerStatusOverviewAllReports: build.query({
        query: (filterData) => ({
          url: `${PASSENGER_STATUS_OVERVIEW_FILTER_WITHOUT_PG}${filterData?.agent}`,
        }),
        providesTags: ['passengerStatusOverviewReports'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerStatusOverviewReportApi;
export const {
  useGetPassengerStatusOverviewReportsQuery,
  useGetPassengerStatusOverviewAllReportsQuery,
} = PassengerStatusOverviewReportApi;

export const selectFilteredPassengerStatusOverviewReports = (
  passengerStatusOverviewReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerStatusOverviewReports;
    }

    return FuseUtils.filterArrayByString(
      passengerStatusOverviewReports,
      searchText
    );
  });
