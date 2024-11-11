import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  VISA_ENTRY_FILTER_BY,
  VISA_ENTRY_FILTER_BY_WP,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['visaEntryReports'];
const ActivityLogReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getActivityLogReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['visaEntryReports'],
      }),
      getActivityLogAllReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY_WP,
          params: filterData,
        }),
        providesTags: ['visaEntryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ActivityLogReportApi;
export const {
  useGetActivityLogReportsQuery,
  useGetActivityLogAllReportsQuery,
} = ActivityLogReportApi;

export const selectFilteredActivityLogReports = (visaEntryReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaEntryReports;
    }

    return FuseUtils.filterArrayByString(visaEntryReports, searchText);
  });
