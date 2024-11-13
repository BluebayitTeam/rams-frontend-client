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

export const addTagTypes = ['visaEntryReports'];
const VisaEntryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaEntryReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['visaEntryReports'],
      }),
      getVisaEntryAllReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY_WP,
          params: filterData,
        }),
        providesTags: ['visaEntryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaEntryReportApi;
export const { useGetVisaEntryReportsQuery, useGetVisaEntryAllReportsQuery } =
  VisaEntryReportApi;

export const selectFilteredVisaEntryReports = (visaEntryReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaEntryReports;
    }

    return FuseUtils.filterArrayByString(visaEntryReports, searchText);
  });
