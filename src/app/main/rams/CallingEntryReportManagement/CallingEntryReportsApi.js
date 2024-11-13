import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CALLING_ENTRY_FILTER_BY,
  CALLING_ENTRY_FILTER_BY_WP,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['callingEntryReports'];
const CallingEntryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCallingEntryReports: build.query({
        query: (filterData) => ({
          url: CALLING_ENTRY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['callingEntryReports'],
      }),
      getCallingEntryAllReports: build.query({
        query: (filterData) => ({
          url: CALLING_ENTRY_FILTER_BY_WP,
          params: filterData,
        }),
        providesTags: ['callingEntryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default CallingEntryReportApi;
export const {
  useGetCallingEntryReportsQuery,
  useGetCallingEntryAllReportsQuery,
} = CallingEntryReportApi;

export const selectFilteredCallingEntryReports = (callingEntryReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return callingEntryReports;
    }

    return FuseUtils.filterArrayByString(callingEntryReports, searchText);
  });
