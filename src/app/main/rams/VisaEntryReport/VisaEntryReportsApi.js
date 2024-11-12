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
