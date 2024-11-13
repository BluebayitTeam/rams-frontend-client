import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  ACCOUNTSTATEMENT_FILTER_BY,
  ACCOUNTSTATEMENT_FILTER_WITHOUT_PG,
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_COMPANY_OVERVIEW_REPORT,
  GET_COMPANY_OVERVIEW_REPORT_WITHOUT_PG,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT,
  VISA_ENTRY_FILTER_BY,
  VISA_ENTRY_FILTER_BY_WP,
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
          url: VISA_ENTRY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['callingEntryReports'],
      }),
      getCallingEntryAllReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY_WP,
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
